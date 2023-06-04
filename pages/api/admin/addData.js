import { data } from "@/models/data";
import db from "utils/db";

export default async function addData(req, res) {
   if (req.method === "POST") {
      try {
         db.connect();
         const {
            name,
            href,
            imgSrc,
            description,
            author,
            illustrator,
            genre,
            otherName,
            status,
            pdfVolume,
            epubVolume,
         } = req.body;

         // Create a new instance of the data model
         const newData = new data({
            name,
            href,
            imgSrc,
            description,
            author,
            illustrator,
            genre,
            otherName,
            status,
            pdfVolume,
            epubVolume,
         });

         // Save the new data to the database
         await data.collection.insertOne(newData);
         db.disconnect();
         res.status(200).json("Successfully");
      } catch (error) {
         res.status(500).json({ error: "Error adding data" });
      }
   } else {
      res.status(400).json({ error: "Invalid request method" });
   }
}
