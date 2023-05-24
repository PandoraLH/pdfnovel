import db from "@/utils/db";
import { user } from "@/models/data";
import bcrypt from "bcryptjs";

const pepper = process.env.PEPPER;

export default async function login(req, res) {
  if (req.method === "POST") {
    try {
      await db.connect();
      const { name, password } = req.body;
      const userData = await user.findOne({ name: name });

      if (!userData) {
        return res.status(400).json({ message: "User not found" });
      }

      const isPasswordValid = await bcrypt.compare(
        password + pepper,
        userData.password
      );

      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" });
      }

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
