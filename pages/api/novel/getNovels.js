import db from "@/utils/db";
import { data } from "@/models/data";

export default async function getNovels(req, res) {
  if (req.method === "GET") {
    try {
      const currentPage = req.query.page;
      const [, novels] = await Promise.all([
        db.connect(),
        data
          .find({})
          .skip((currentPage - 1) * 10)
          .limit(10),
      ]);
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
