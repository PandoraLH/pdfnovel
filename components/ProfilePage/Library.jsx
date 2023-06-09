import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { FaBars } from "react-icons/fa";
import ProfileMenuModal from "./ProfileMenuModal";
import { useSession } from "next-auth/react";
import axios from "axios";
import LightNovel from "components/Series/LightNovel";
import FDButton from "components/SeriesDetails/FDButton";

const Library = () => {
   const [openModal, setOpenModal] = useState(false);
   const { data: session } = useSession();
   const [followedNovels, setFollowedNovels] = useState([]);

   const handleOpenModal = () => {
      setOpenModal(true);
   };

   const handleCloseModal = () => {
      setOpenModal(false);
   };

   useEffect(() => {
      const fetchFollowedNovels = async () => {
         if (session.user?.followedNovel) {
            try {
               const novels = [];
               for (const novelId of session.user.followedNovel) {
                  const response = await axios.get(
                     `${process.env.NEXT_PUBLIC_BASE_URL}/api/novel/getLibrary/${novelId}`
                  );
                  novels.push(response.data);
               }
               setFollowedNovels(novels);
            } catch (error) {
               console.log(error);
            }
         } else {
         }
      };

      fetchFollowedNovels();
   }, [session]);

   return (
      <div className="library">
         <Box className="md:hidden flex pt-4 pl-4">
            <FaBars size={28} className="" onClick={handleOpenModal} />
            <ProfileMenuModal isOpen={openModal} isClose={handleCloseModal} />
         </Box>
         <Typography
            className="pb-3 md:pt-3 flex justify-center text-rose-500 font-semibold text-2xl"
            variant="h5"
         >
            Library
         </Typography>
         <div className="flex flex-col">
            {followedNovels.length > 0 ? (
               <div className="">
                  {followedNovels.map((novel) => (
                     <div className="">
                        <LightNovel
                           key={novel._id}
                           id={novel._id}
                           image={novel.imgSrc}
                           title={novel.name}
                           description={novel.description}
                           otherNames={novel.otherNames}
                           genres={novel.genres}
                           author={novel.author}
                           status={novel.status}
                        />
                        <div className="pb-5 px-2">
                           <FDButton novelId={novel._id} />
                        </div>
                     </div>
                  ))}
               </div>
            ) : (
               <p className="text-gray-400 mt-2">
                  Your library is empty, follow some novels to fill it!
               </p>
            )}
         </div>
      </div>
   );
};

export default Library;
