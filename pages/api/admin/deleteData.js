import data from "models/data";
import db from "utils/db";

const dataId = "6472f9936a86b1ce44ced622"; // ID of the data document to delete

export default async function handler(req, res) {
   try {
      await db.connect(); // Connect to MongoDB

      // Call the addNewData function with the new item data
      const result = await data.findByIdAndDelete(dataId);

      await db.disconnect();

      if (result) {
         res.status(200).json({
            message: "Delete Successfully.",
         });
      } else {
         res.status(404).json({ message: "Novel not found" });
      }
   } catch (error) {
      res.status(500).json({ error: "An error occurred." });
   }
}
