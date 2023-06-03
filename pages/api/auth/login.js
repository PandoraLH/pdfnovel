import db from "@/utils/db";
import { user } from "@/models/data";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const pepper = process.env.PEPPER;

export default async function login(req, res) {
  if (req.method === "POST") {
    try {
      await db.connect();
      const { name, password } = req.body;
      const userData = await user.findOne({ name: name });

      if (!userData) {
        return res.status(400).json({
          errorType: "username",
          message: "User not found",
        });
      }

      const isPasswordValid = await bcrypt.compare(
        password + pepper,
        userData.password
      );

      if (!isPasswordValid) {
        return res.status(400).json({
          errorType: "password",
          message: "Invalid password",
        });
      }

      const token = jwt.sign({ data: userData._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.setHeader("Set-Cookie", `token=${token}; path=/; HttpOnly`);

      res.status(200).json({
        message: "User logged in successfully",
        user: {
          _id: userData._id,
          name: userData.name,
          email: userData.email,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Error getting users" });
    } finally {
      await db.disconnect();
    }
  }
}
