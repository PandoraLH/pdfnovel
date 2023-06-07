import db from "@/utils/db";
import { data } from "@/models/data";

export default async function getNovels(req, res) {
   if (req.method === "GET") {
      try {
         const currentPage = req.query.page;
         const searchQuery = req.query.search || "";
         const sortOption = req.query.sort || "A-Z"; // Default sort option is "A-Z"
         const genreFilter = req.query.genre || ""; // Genre filter

         await db.connect();

         const nameRegex = new RegExp(searchQuery, "i"); // Add "i" flag for case-insensitive search

         const sortQuery = {};

         if (sortOption === "A-Z") {
            sortQuery.name = 1;
         } else if (sortOption === "Z-A") {
            sortQuery.name = -1;
         } else if (sortOption === "Newest") {
            sortQuery.createdAt = -1;
         } else if (sortOption === "Oldest") {
            sortQuery.createdAt = 1;
         }

         const genreQuery = {}; // Genre query
         if (genreFilter !== "") {
            genreQuery["genre.name"] = { $regex: new RegExp(genreFilter, "i") };
         }

         const novels = await data
            .find(
               {
                  $and: [
                     {
                        $or: [
                           { name: { $regex: nameRegex } },
                           {
                              otherName: {
                                 $elemMatch: { name: { $regex: nameRegex } },
                              },
                           },
                           { author: { $regex: nameRegex } },
                        ],
                     },
                     genreQuery, // Apply genre filter
                  ],
               },
               {
                  name: 1,
                  imgSrc: 1,
                  description: 1,
                  genre: 1,
                  otherName: 1,
                  author: 1,
                  status: 1,
               }
            )
            .lean()
            .sort(sortQuery) // Apply the sort query
            .skip((currentPage - 1) * 10)
            .limit(10);

         const mappedNovels = novels.map((novel) => {
            const { _id, name, imgSrc, author, status } = novel;
            const description =
               novel.description[novel.description.length - 1].synopsis;
            const otherNames = novel.otherName.map((name) => name.name);
            const genres = novel.genre.map((genre) => genre.name);

            return {
               _id,
               name,
               imgSrc,
               author,
               status,
               description,
               otherNames,
               genres,
            };
         });

         res.status(200).json(mappedNovels);
      } catch (error) {
         console.error(error);
         res.status(500).json({ message: "Error retrieving Novels" });
      } finally {
         await db.disconnect();
      }
   } else {
      res.status(405).json({ message: "Method not allowed" });
   }
}
