import data from "models/data";
import db from "utils/db";

export default async function handler(req, res) {
   try {
      // Connect to the database
      await db.connect();

      // Call the updateData function with the new field values
      for (const item of newData2) {
         await updateData(item);
      }

      // Disconnect from the database
      await db.disconnect();

      // Send a response or perform any additional actions
      res.status(200).json({
         message: "New fields added to the data successfully.",
      });
   } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "An error occurred." });
   }
}

async function updateData(newItem) {
   try {
      // Find the existing data document by its ID
      const existingData = await data.findById(newItem.dataId);

      if (!existingData) {
         throw new Error("Data not found");
      }

      // enter the data that u need to update
      existingData.status = newItem.status;
      existingData.otherName = newItem.otherName;
      existingData.author = newItem.author;
      existingData.illustrator = newItem.illustrator;
      existingData.genre = newItem.genre;

      await existingData.save();

      console.log("New fields added to the data successfully.");
   } catch (error) {
      console.error("Error adding new fields to the data:", error);
   }
}
