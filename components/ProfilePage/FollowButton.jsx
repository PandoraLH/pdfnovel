import { Box, Typography, Button } from "@mui/material";
import { AiFillEye } from "react-icons/ai";
import axios from "axios";

const FollowButton = ({ novelId, session, reloadLibrary }) => {
  const handleFollowNovel = async () => {
    try {
      const apiUrl = `/api/user/followedNovel`;

      // Unfollow the novel
      await axios.delete(apiUrl, {
        data: {
          email: session.user.email,
          novelId: novelId,
        },
      });

      // Reload the library
      reloadLibrary();
    } catch (error) {
      console.error("Error unfollowing novel:", error);
    }
  };

  return (
    <Box className="">
      <Button
        className="px-5 py-2 bg-main-bg-color text-black rounded-md shadow-md hover:bg-rose-400 normal-case gap-2"
        onClick={handleFollowNovel}
      >
        <AiFillEye size={26} />
        <Typography className="text-lg text-black">Unfollow</Typography>
      </Button>
    </Box>
  );
};

export default FollowButton;
