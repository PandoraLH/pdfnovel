import db from "@/utils/db";
import data from "@/models/data";

export default async function getBookById(req, res) {
   const { bookId } = req.query;

   try {
      await db.connect();

      const book = await data.findById(bookId);

      if (!book) {
         return res.status(404).json({ message: "Book not found" });
      }

      return res.json(book);
   } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
   } finally {
      await db.disconnect();
   }
}
