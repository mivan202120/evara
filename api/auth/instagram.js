import jwt from "jsonwebtoken";
import { getDb } from "../_lib/db.js";

const JWT_SECRET = process.env.JWT_SECRET || "evara-dev-secret-2026";
const IG_APP_ID = process.env.INSTAGRAM_APP_ID;
const IG_APP_SECRET = process.env.INSTAGRAM_APP_SECRET;
const BASE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:8090";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  // Step 1: Redirect to Instagram authorization
  if (req.method === "GET" && !req.query.code) {
    const redirectUri = `${BASE_URL}/api/auth/instagram`;
    const scope = "instagram_business_basic";
    const authUrl = `https://www.instagram.com/oauth/authorize?enable_signup=true&client_id=${IG_APP_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&response_type=code`;
    return res.redirect(302, authUrl);
  }

  // Step 2: Handle callback with authorization code
  if (req.method === "GET" && req.query.code) {
    try {
      const code = req.query.code;
      const redirectUri = `${BASE_URL}/api/auth/instagram`;

      // Exchange code for short-lived token
      const tokenRes = await fetch("https://api.instagram.com/oauth/access_token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: IG_APP_ID,
          client_secret: IG_APP_SECRET,
          grant_type: "authorization_code",
          redirect_uri: redirectUri,
          code,
        }),
      });

      if (!tokenRes.ok) {
        const errText = await tokenRes.text();
        console.error("Instagram token error:", errText);
        return res.redirect(302, `${BASE_URL}/?auth_error=instagram_token_failed`);
      }

      const tokenData = await tokenRes.json();
      const { access_token, user_id } = tokenData;

      // Get user profile
      const profileRes = await fetch(
        `https://graph.instagram.com/v22.0/me?fields=user_id,username,name,profile_picture_url,account_type&access_token=${access_token}`
      );

      let profile = { username: `ig_user_${user_id}`, name: `Usuario ${user_id}` };
      if (profileRes.ok) {
        profile = await profileRes.json();
      }

      const igUsername = profile.username || `ig_user_${user_id}`;
      const igName = profile.name || igUsername;
      const igAvatar = profile.profile_picture_url || null;
      // Instagram doesn't provide email — use username@instagram as identifier
      const igEmail = `${igUsername}@instagram.evara`;

      const sql = getDb();

      // Check if user exists
      const existing = await sql`SELECT id, name, email, fitness_goal, plan, avatar_url FROM users WHERE email = ${igEmail}`;

      let user;
      if (existing.length > 0) {
        user = existing[0];
        if (igAvatar && !user.avatar_url) {
          await sql`UPDATE users SET avatar_url = ${igAvatar}, updated_at = NOW() WHERE id = ${user.id}`;
          user.avatar_url = igAvatar;
        }
      } else {
        const result = await sql`
          INSERT INTO users (name, email, password_hash, avatar_url, plan)
          VALUES (${igName}, ${igEmail}, ${'instagram_oauth_' + user_id}, ${igAvatar}, 'free')
          RETURNING id, name, email, fitness_goal, plan, avatar_url
        `;
        user = result[0];
      }

      // Generate JWT
      const token = jwt.sign(
        { userId: user.id, email: user.email, plan: user.plan },
        JWT_SECRET,
        { expiresIn: "30d" }
      );

      // Redirect back to the site with token in hash (so it's not sent to server logs)
      const isNewUser = existing.length === 0;
      return res.redirect(302,
        `${BASE_URL}/?auth_success=instagram&token=${token}&user=${encodeURIComponent(JSON.stringify({
          id: user.id, name: user.name, email: user.email,
          fitness_goal: user.fitness_goal, plan: user.plan, avatar_url: user.avatar_url,
        }))}&new_user=${isNewUser}`
      );
    } catch (error) {
      console.error("Instagram auth error:", error);
      return res.redirect(302, `${BASE_URL}/?auth_error=instagram_failed`);
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
