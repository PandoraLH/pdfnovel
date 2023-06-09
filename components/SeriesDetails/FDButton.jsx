import { Box, Typography, Button } from "@mui/material";
import { AiFillEye } from "react-icons/ai";
import { useSession, useProvider } from "next-auth/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const FDButton = ({ novelId }) => {
   const { data: session } = useSession();
   const [isFollowing, setIsFollowing] = useState(false);
   useEffect(() => {
      const checkFollowing = () => {
         if (
            session &&
            session.user &&
            session.user.followedNovel &&
            session.user.followedNovel.some(
               (followedNovel) => followedNovel.toString() === novelId
            )
         ) {
            setIsFollowing(true);
         } else {
            setIsFollowing(false);
         }
      };

      checkFollowing();
   }, [session, novelId]);

   const handleFollowNovel = async () => {
      try {
         const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/followedNovel`;

         if (isFollowing) {
            // Unfollow the novel
            await axios.delete(apiUrl, {
               data: {
                  email: session.user.email,
                  novelId: novelId,
               },
            });
            setIsFollowing(false); // Update the state to reflect the unfollow action
         } else {
            // Follow the novel
            await axios.post(apiUrl, {
               email: session.user.email,
               novelId: novelId,
            });
            setIsFollowing(true); // Update the state to reflect the follow action
         }
      } catch (error) {
         console.error("Error following/unfollowing novel:", error);
      }
   };
   return (
      <Box className="flex flex-col gap-3 ">
         <Button
            className="px-5 py-2 bg-main-bg-color text-black rounded-md shadow-md hover:bg-rose-400 normal-case gap-2"
            onClick={handleFollowNovel} // Call the handleFollowNovel function on button click
         >
            <AiFillEye size={26} />
            <Typography className="text-lg text-black">
               {isFollowing ? "Unfollow" : "Follow"}
            </Typography>{" "}
         </Button>
         <Button className="px-4 py-1 bg-gray-800 text-white text-lg rounded-md shadow-md hover:bg-gray-500 normal-case">
            Dicuss
         </Button>
      </Box>
   );
};

export default FDButton;
