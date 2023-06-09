import db from "@/utils/db";
import { user, userGoogle, userFacebook } from "@/models/data";

export default async function followNovel(req, res) {
   if (req.method === "POST") {
      // Follow the novel
      try {
         await db.connect();

         const { email, novelId } = req.body;

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

         // Add the novelId to the user's followedNovel array
         foundUser.followedNovel.push(novelId);
         await foundUser.save();

         res.status(200).json({ message: "Novel followed successfully" });
      } catch (error) {
         res.status(500).json({ message: "Error following novel" });
      } finally {
         await db.disconnect();
      }
   } else if (req.method === "DELETE") {
      // Unfollow the novel
      try {
         await db.connect();

         const { email, novelId } = req.body;

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

         // Remove the novelId from the user's followedNovel array
         const index = foundUser.followedNovel.indexOf(novelId);
         if (index > -1) {
            foundUser.followedNovel.splice(index, 1);
         }
         await foundUser.save();

         res.status(200).json({ message: "Novel unfollowed successfully" });
      } catch (error) {
         res.status(500).json({ message: "Error unfollowing novel" });
      } finally {
         await db.disconnect();
      }
   } else {
      res.status(405).json({ message: "Method Not Allowed" });
   }
}
