import db from "@/utils/db";
import { data } from "@/models/data";

export default async function handler(req, res) {
   if (req.method === "GET") {
      try {
         await db.connect();

         const genres = await data.distinct("genre.name");
         const filteredGenres = genres.filter((genre) => genre !== ""); // Filter out empty string

         res.status(200).json(filteredGenres);
      } catch (error) {
         console.error("Error fetching genres:", error);
         res.status(500).json({ error: "Failed to fetch genres" });
      } finally {
         await db.disconnect();
      }
   }
}
