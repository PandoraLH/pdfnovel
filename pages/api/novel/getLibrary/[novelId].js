import db from "@/utils/db";
import { data } from "@/models/data";

export default async function handler(req, res) {
   if (req.method === "GET") {
      try {
         const { novelId } = req.query;

         await db.connect();

         const novel = await data
            .findById(novelId)
            .select("name imgSrc description genre otherName author status")
            .lean();

         if (!novel) {
            return res.status(404).json({ message: "Novel not found" });
         }

         const { _id, name, imgSrc, author, status } = novel;
         const description =
            novel.description[novel.description.length - 1].synopsis;
         const otherNames = novel.otherName.map((name) => name.name);
         const genres = novel.genre.map((genre) => genre.name);

         res.status(200).json({
            _id,
            name,
            imgSrc,
            author,
            status,
            description,
            otherNames,
            genres,
         });
      } catch (error) {
         console.error(error);
         res.status(500).json({ message: "Error retrieving novel" });
      } finally {
         await db.disconnect();
      }
   } else {
      res.status(405).json({ message: "Method not allowed" });
   }
}
