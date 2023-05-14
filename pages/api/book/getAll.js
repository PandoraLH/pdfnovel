import db from "@/utils/db";
import data from "@/models/data";


// Connect to MongoDB database
db.connect();

// Define the route handler
export default async function getAll(req, res) {
   if (req.method === "GET") {
      try {
         const books = await data.find({});
         res.status(200).json(books);
      } catch (error) {
         console.error(error);
         res.status(500).json({ message: "Error retrieving books" });
      }
   } else {
      res.status(405).json({ message: "Method not allowed" });
   }
}

// Disconnect from MongoDB database
db.disconnect();
