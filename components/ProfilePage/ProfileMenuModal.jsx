import { useState, useEffect, useCallback } from "react";
import { Box } from "@mui/material";
import { AiFillCloseSquare } from "react-icons/ai";
import ProfileMenu from "./ProfileMenu";

const ProfileMenuModal = ({ isOpen, isClose }) => {
   const [showModal, setShowModal] = useState(isOpen);

   useEffect(() => {
      setShowModal(isOpen);
   }, [isOpen]);

   const handleClose = useCallback(() => {
      setShowModal(false);

      setTimeout(() => {
         isClose();
      }, 300);
   }, [isClose]);

   if (isOpen === false) {
      return null;
   }
   return (
      <Box className="fixed inset-0 z-10 outline-none focus:outline-none bg-neutral-800/70 ">
         <Box
            className={`
           translate 
           duration-300 
           h-full
           ${showModal ? "translate-x-50" : "translate-x-0"}
           ${showModal ? "opacity-100" : "opacity-0"}`}
         >
            <Box
               className="translate w-1/2 
        shadow-lg h-full absolute left-0 bg-zinc-100 outline-none focus:outline-none overflow-y-scroll"
            >
               <div className="absolute right-2">
                  <AiFillCloseSquare
                     size={35}
                     className="text-black"
                     onClick={handleClose}
                  />
               </div>
               <ProfileMenu />
            </Box>
         </Box>
      </Box>
   );
};

export default ProfileMenuModal;
