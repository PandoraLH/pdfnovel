import db from "@/utils/db";
import data from "@/models/data";

export default async function getNovel(req, res) {
  if (req.method === "GET") {
    try {
      await db.connect();
      const page = parseInt(req.query.page) || 1;
      const offset = (page - 1) * 10;
      const books = await data.find({}).skip(offset).limit(10);
      res.status(200).json(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving books" });
    } finally {
      await db.disconnect();
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
