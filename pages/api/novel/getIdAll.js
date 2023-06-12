import db from "@/utils/db";
import { data } from "@/models/data";

export default async function getIdAll(req, res) {
   if (req.method === "GET") {
      try {
         await db.connect();

         const novels = await data.find({}).select("_id");
         const ids = novels.map((novel) => novel._id);

         res.status(200).json(ids);
      } catch (error) {
         console.error(error);
         res.status(500).json({ message: "Error retrieving Novel IDs" });
      } finally {
         await db.disconnect();
      }
   } else {
      res.status(405).json({ message: "Method not allowed" });
   }
}
