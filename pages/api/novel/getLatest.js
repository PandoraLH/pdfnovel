import db from "@/utils/db";
import { data } from "@/models/data";

export default async function handler(req, res) {
   if (req.method === "GET") {
      try {
         await db.connect();

         const latestNovels = await data
            .find()
            .sort({ updatedAt: -1 }) // Sort by updatedAt field in descending order
            .limit(24) // Retrieve the latest 24 novels
            .exec();
         res.status(200).json(latestNovels);
      } catch (error) {
         res.status(500).json({ error: "Failed to retrieve latest novels" });
      } finally {
         await db.disconnect();
      }
   }
}
