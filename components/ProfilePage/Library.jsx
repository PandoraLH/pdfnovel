import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { FaBars } from "react-icons/fa";
import ProfileMenuModal from "./ProfileMenuModal";
import axios from "axios";
import LightNovel from "components/Series/LightNovel";
import FollowButton from "./FollowButton";

const Library = ({ session }) => {
   const [openModal, setOpenModal] = useState(false);
   const [followedNovels, setFollowedNovels] = useState([]);

   const handleOpenModal = () => {
      setOpenModal(true);
   };

   const handleCloseModal = () => {
      setOpenModal(false);
   };

   const fetchFollowedNovels = async () => {
      if (session.user.email) {
         try {
            const response = await axios.get(
               `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/getFollowedNovel?email=${session.user.email}`
            );
            const followedNovels = response.data;
            setFollowedNovels(followedNovels);
         } catch (error) {
            console.log(error);
         }
      } else {
         setFollowedNovels([]);
      }
   };

   useEffect(() => {
      fetchFollowedNovels();
   }, []);

   const reloadLibrary = () => {
      fetchFollowedNovels();
   };

   return (
      <div className="library">
         <Box className="md:hidden flex pt-4 pl-4">
            <FaBars size={28} className="" onClick={handleOpenModal} />
            <ProfileMenuModal isOpen={openModal} isClose={handleCloseModal} />
         </Box>
         <div className="flex flex-col border-gray-300 border-l-2">
            <Typography className="pb-3 md:pt-3 flex justify-center text-rose-500 font-semibold text-4xl border-gray-300 border-b-2">
               Library
            </Typography>
            {followedNovels.length > 0 ? (
               <div className="">
                  {followedNovels.map((novel) => (
                     <div className="flex flex-col items-end pt-2 pr-2">
                        <div className=" ">
                           <FollowButton
                              novelId={novel._id}
                              session={session}
                              reloadLibrary={reloadLibrary}
                           />
                        </div>
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
