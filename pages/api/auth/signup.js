import db from "@/utils/db";
import { user, userGoogle, userFacebook } from "@/models/data";
import bcrypt from "bcryptjs";

const pepper = process.env.PEPPER;
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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

      const existingEmailGoogle = await userGoogle.findOne({
        email: email,
      });

      const existingEmailFacebook = await userFacebook.findOne({
        email: email,
      });

      if (existingEmail || existingEmailGoogle || existingEmailFacebook) {
        return res.status(400).json({
          errorType: "email",
          message:
            "Email already exists, please check if you have already registered with another provider like Google or Facebook",
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
        role: "user",
        followedNovel: [], // add empty followedNovel field
      });

      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error creating user" });
    } finally {
      await db.disconnect();
    }
  }
}
