import { Box, Typography, Button } from "@mui/material";
import { AiFillEye } from "react-icons/ai";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useState, useEffect } from "react";

const FDButton = ({ novelId }) => {
  const { data: session } = useSession();
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const checkFollowing = async () => {
      try {
        const response = await axios.get(
          `/api/user/getFollowedNovel?email=${session.user.email}`
        );
        const followedNovels = response.data;
        setIsFollowing(followedNovels.some((novel) => novel._id === novelId));
      } catch (error) {
        console.log(error);
      }
    };

    checkFollowing();
  }, [novelId, session]);

  const handleFollowNovel = async () => {
    try {
      const apiUrl = `/api/user/followedNovel`;

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
