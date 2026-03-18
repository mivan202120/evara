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
    const { name, email, password, fitness_goal, plan, payment_method } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Nombre, email y contraseña son requeridos." });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres." });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Email inválido." });
    }

    const sql = getDb();

    // Check if email exists
    const existing = await sql`SELECT id FROM users WHERE email = ${email.toLowerCase().trim()}`;
    if (existing.length > 0) {
      return res.status(409).json({ error: "Este email ya está registrado. ¿Quieres iniciar sesión?" });
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 12);

    // Insert user
    const result = await sql`
      INSERT INTO users (name, email, password_hash, fitness_goal, plan, payment_method)
      VALUES (${name.trim()}, ${email.toLowerCase().trim()}, ${password_hash}, ${fitness_goal || null}, ${plan || 'free'}, ${payment_method || null})
      RETURNING id, name, email, fitness_goal, plan, created_at
    `;

    const user = result[0];

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, plan: user.plan },
      JWT_SECRET,
      { expiresIn: "30d" }
    );

    return res.status(201).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        fitness_goal: user.fitness_goal,
        plan: user.plan,
      },
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
}
