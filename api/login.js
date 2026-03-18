import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDb } from "./_lib/db.js";

const JWT_SECRET = process.env.JWT_SECRET || "evara-dev-secret-2026";

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña son requeridos." });
    }

    const sql = getDb();

    // Find user
    const users = await sql`
      SELECT id, name, email, password_hash, fitness_goal, plan, avatar_url, created_at
      FROM users WHERE email = ${email.toLowerCase().trim()}
    `;

    if (users.length === 0) {
      return res.status(401).json({ error: "Email o contraseña incorrectos." });
    }

    const user = users[0];

    // Verify password
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: "Email o contraseña incorrectos." });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, plan: user.plan },
      JWT_SECRET,
      { expiresIn: "30d" }
    );

    return res.status(200).json({
      success: true,
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
    console.error("Login error:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
}
