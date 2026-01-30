import express from "express";
import bcrypt from "bcrypt";
import { supabase } from "./supabase.js";

const router = express.Router();

/* ================= SIGNUP ================= */
router.post("/signup", async (req, res) => {
  try {
    const { name, email, age, location, password } = req.body;

    if (!name || !email || !age || !location || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { error } = await supabase.from("users").insert({
      name,
      email,
      age,
      location,
      password: hashedPassword
    });

    if (error) {
      return res.status(400).json({ message: "Email already exists" });
    }

    res.status(201).json({
      message: "User registered successfully"
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/myprofile", async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ message: "Name query is required" });
    }

    const { data, error } = await supabase
      .from("users")
      .select("id, name, email, age, location")
      .eq("name", name)
      .single();

    if (error || !data) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(data);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
