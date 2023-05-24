import db from "@/utils/db";
import { data } from "@/models/data";

export default async function getAll(req, res) {
  if (req.method === "GET") {
    try {
      await db.connect();

      const novels = await data.find({});
      res.status(200).json(novels);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving Novels" });
    } finally {
      await db.disconnect();
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
