import { data } from "models/data";
import db from "utils/db";

export default async function handler(req, res) {
   if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
   }

   try {
      const { dataId } = req.query;
      const newData = req.body;

      // Connect to the database
      await db.connect();

      // Find the existing data document by its ID
      const existingData = await data.findById(dataId);

      if (!existingData) {
         await db.disconnect();
         return res.status(404).json({ error: "Data not found" });
      }

      // Update the fields of the existing data document
      existingData.name = newData.name;
      existingData.href = newData.href;
      existingData.imgSrc = newData.imgSrc;
      existingData.description = newData.description;
      existingData.author = newData.author;
      existingData.illustrator = newData.illustrator;
      existingData.genre = newData.genre;
      existingData.otherName = newData.otherName;
      existingData.status = newData.status;
      existingData.pdfVolume = newData.pdfVolume;
      existingData.epubVolume = newData.epubVolume;

      await existingData.save();

      // Disconnect from the database
      await db.disconnect();

      // Send a response or perform any additional actions
      res.status(200).json({
         message: "Novel updated successfully.",
      });
   } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "An error occurred." });
   }
}
