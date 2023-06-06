import db from "@/utils/db";
import { user } from "@/models/data";
import bcrypt from "bcryptjs";

const pepper = process.env.PEPPER;
const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

export default async function signup(req, res) {
  if (req.method === "POST") {
    try {
      await db.connect();
      const { name, email, password } = req.body;

      const existingUser = await user.findOne({
        name: name,
      });

      if (existingUser) {
        return res.status(400).json({
          errorType: "username",
          message: "User already exists",
        });
      }

      const existingEmail = await user.findOne({
        email: email,
      });

      if (existingEmail) {
        return res.status(400).json({
          errorType: "email",
          message: "Email already exists",
        });
      }

      if (!emailRegex.test(email)) {
        return res.status(400).json({
          errorType: "email",
          message: "Invalid email",
        });
      }

      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          errorType: "password",
          message:
            "Password must be at least 8 characters long and at least contain a number and an uppercase letter",
        });
      }

      const hashedPassword = await bcrypt.hash(
        password + pepper,
        await bcrypt.genSalt()
      );

      await user.create({
        name: name,
        email: email,
        password: hashedPassword,
      });

      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error creating user" });
    } finally {
      await db.disconnect();
    }
  }
}
