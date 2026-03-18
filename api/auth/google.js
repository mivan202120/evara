import jwt from "jsonwebtoken";
import { getDb } from "../_lib/db.js";

const JWT_SECRET = process.env.JWT_SECRET || "evara-dev-secret-2026";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { credential } = req.body;
    if (!credential) return res.status(400).json({ error: "Google credential is required." });

    // Verify the Google ID token using Google's tokeninfo endpoint
    const verifyRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`);
    if (!verifyRes.ok) return res.status(401).json({ error: "Token de Google inválido." });

    const payload = await verifyRes.json();

    // Verify audience matches our client ID
    if (GOOGLE_CLIENT_ID && payload.aud !== GOOGLE_CLIENT_ID) {
      return res.status(401).json({ error: "Token no pertenece a esta aplicación." });
    }

    const { email, name, picture, sub: googleId } = payload;
    const sql = getDb();

    // Check if user already exists
    const existing = await sql`SELECT id, name, email, fitness_goal, plan, avatar_url FROM users WHERE email = ${email.toLowerCase()}`;

    let user;
    if (existing.length > 0) {
      // Login: update avatar if needed
      user = existing[0];
      if (picture && !user.avatar_url) {
        await sql`UPDATE users SET avatar_url = ${picture}, updated_at = NOW() WHERE id = ${user.id}`;
        user.avatar_url = picture;
      }
    } else {
      // Register: create new user with Google data (no password needed)
      const result = await sql`
        INSERT INTO users (name, email, password_hash, avatar_url, plan)
        VALUES (${name}, ${email.toLowerCase()}, ${'google_oauth_' + googleId}, ${picture || null}, 'free')
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

    return res.status(200).json({
      success: true,
      isNewUser: existing.length === 0,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        fitness_goal: user.fitness_goal,
        plan: user.plan,
        avatar_url: user.avatar_url,
      },
      token,
    });
  } catch (error) {
    console.error("Google auth error:", error);
    return res.status(500).json({ error: "Error al autenticar con Google." });
  }
}
