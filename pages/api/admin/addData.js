import data from "models/data";
import db from "utils/db";

const newItem = {
   name: "Example Data",
   href: "http://example.com",
   imgSrc: "http://example.com/image.jpg",
   description: [
      {
         panel: "Panel 1",
         description: "Description 1",
         synopsis: "Synopsis 1",
      },
      {
         panel: "Panel 2",
         description: "Description 2",
         synopsis: "Synopsis 2",
      },
   ],
   author: "John Doe",
   illustrator: "Jane Smith",
   genre: [{ name: "Action" }, { name: "Adventure" }],
   otherName: [{ name: "Alternate Name 1" }, { name: "Alternate Name 2" }],
   status: "Ongoing",
   pdfVolume: [
      {
         name: "Volume 1",
         link: "http://example.com/volume1.pdf",
      },
      {
         name: "Volume 2",
         link: "http://example.com/volume2.pdf",
      },
   ],
   epubVolume: [
      {
         name: "Volume 1",
         link: "http://example.com/volume1.epub",
      },
      {
         name: "Volume 2",
         link: "http://example.com/volume2.epub",
      },
   ],
};

export default async function handler(req, res) {
   try {
      await db.connect(); // Connect to MongoDB

      // Call the addNewData function with the new item data
      await addNewData(newItem);

      await db.disconnect();

      res.status(200).json({
         message: "New fields added to the data successfully.",
      });
   } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "An error occurred." });
   }
}

async function addNewData(newItem) {
   try {
      // Create a new data document with the new fields
      const newData = new data({
         name: newItem.name,
         imgSrc: newItem.imgSrc,
         description: newItem.description,
         author: newItem.author,
         illustrator: newItem.illustrator,
         genre: newItem.genre,
         otherName: newItem.otherName,
         status: newItem.status,
         pdfVolume: newItem.pdfVolume,
         epubVolume: newItem.epubVolume,
      });

      // Save the new data document to the database
      await newData.save();

      console.log("New data added successfully.");
   } catch (error) {
      console.error("Error adding new data:", error);
   }
}
