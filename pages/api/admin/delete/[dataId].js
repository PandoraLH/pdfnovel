import { data } from "@/models/data";
import db from "utils/db";

export default async function handler(req, res) {
   try {
      await db.connect(); // Connect to MongoDB

      const { dataId } = req.query; // Retrieve the dataId from the request query

      if (req.method === "DELETE") {
         // Call the findByIdAndDelete function with the dataId to delete the document
         const result = await data.deleteOne({ _id: dataId });

         if (result) {
            res.status(200).json({
               message: "Delete Successfully.",
            });
         } else {
            res.status(404).json({ message: "Data not found" });
         }
      } else {
         res.status(405).json({ message: "Method Not Allowed" });
      }

      await db.disconnect();
   } catch (error) {
      res.status(500).json({ error: "An error occurred." });
   }
}
