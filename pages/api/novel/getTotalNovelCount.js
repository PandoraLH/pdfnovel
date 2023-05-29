import db from "@/utils/db";
import { data } from "@/models/data";

export default async function getTotalNovelCount(req, res) {
  if (req.method === "GET") {
    try {
      await db.connect();
      const count = await data.countDocuments({});
      res.status(200).json(count);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving Novels count" });
    } finally {
      await db.disconnect();
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
