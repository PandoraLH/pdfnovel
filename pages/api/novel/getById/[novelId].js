import db from "@/utils/db";
import data from "@/models/data";

export default async function getBookById(req, res) {
   const { novelId } = req.query;

   try {
      await db.connect();

      const novel = await data.findById(novelId);

      if (!novel) {
         return res.status(404).json({ message: "Novel not found" });
      }

      return res.json(novel);
   } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
   } finally {
      await db.disconnect();
   }
}
