import db from "@/utils/db";
import { user, userGoogle, userFacebook, data } from "@/models/data";

export default async function handler(req, res) {
   if (req.method === "GET") {
      // Retrieve followed novels
      try {
         await db.connect();

         const { email } = req.query;

         // Find the user by email in each user model
         let userModel;
         let foundUser;
         const userModels = [user, userGoogle, userFacebook];

         for (let i = 0; i < userModels.length; i++) {
            userModel = userModels[i];
            foundUser = await userModel.findOne({ email: email });

            if (foundUser) {
               break; // Exit the loop if the user is found
            }
         }

         if (!foundUser) {
            return res.status(404).json({ message: "User not found" });
         }

         const followedNovel = foundUser.followedNovel;

         const novels = await data
            .find({ _id: { $in: followedNovel } })
            .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
            .select("name imgSrc description genre otherName author status")
            .lean();

         const formattedNovels = novels.map((novel) => {
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

         res.status(200).json(formattedNovels);
      } catch (error) {
         console.error(error);
         res.status(500).json({ message: "Error retrieving followed novels" });
      } finally {
         await db.disconnect();
      }
   } else {
      res.status(405).json({ message: "Method not allowed" });
   }
}
