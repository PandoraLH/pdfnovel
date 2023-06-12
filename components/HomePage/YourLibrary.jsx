import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

const YourLibrary = () => {
   const { data: session } = useSession();
   const router = useRouter();
   const [followedNovels, setFollowedNovels] = useState([]);

   useEffect(() => {
      const getFollowedNovel = async () => {
         try {
            const response = await axios.get(
               `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/getFollowedNovel?email=${session.user.email}`
            );
            const followedNovels = response.data;
            setFollowedNovels(followedNovels);
         } catch (error) {
            console.log(error);
         }
      };

      if (session?.user?.email) {
         getFollowedNovel();
      }
   }, [session]);

   const handleLibraryClick = () => {
      if (session) {
         router.push("/profile");
      }
   };

   return (
      <Box className="px-2 pb-2">
         <Typography
            className="text-2xl text-white bg-main-bg-color font-semibold cursor-pointer flex justify-center"
            onClick={handleLibraryClick}
         >
            Your Library
         </Typography>{" "}
         {session ? (
            <Box className="pt-2 flex flex-col gap-3 h-[300px] overflow-y-scroll">
               {followedNovels.length > 0 ? (
                  followedNovels.map((novel) => (
                     <Box
                        className="flex flex-row items-center gap-2"
                        key={novel._id}
                     >
                        <Image src={novel.imgSrc} width={50} height={50} />
                        <Typography className="text-sm">
                           {novel.name}
                        </Typography>
                     </Box>
                  ))
               ) : (
                  <Typography>No novels followed</Typography>
               )}
            </Box>
         ) : (
            <Typography className="text-lg text-center p-3">
               Please Log In to see your library
            </Typography>
         )}
      </Box>
   );
};

export default YourLibrary;
