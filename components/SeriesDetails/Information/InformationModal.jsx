import { useState, useEffect, useCallback } from "react";
import { Box, Typography, Button } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import { AiFillCloseSquare } from "react-icons/ai";
import Image from "next/image";
import FDButton from "../FDButton";
import Information from "./Information";

const InformationModal = ({ isOpen, isClose, novel }) => {
   const [showModal, setShowModal] = useState(isOpen);
   const genres = novel.genre;
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
                ${showModal ? "translate-x-0" : "translate-x-full"}
                ${showModal ? "opacity-100" : "opacity-0"}`}
         >
            <Box
               className="translate w-1/2 
             shadow-lg h-full absolute right-0 bg-zinc-100 outline-none focus:outline-none overflow-y-scroll"
            >
               <Box className="flex flex-col ">
                  <Box className="flex py-4 pl-4 pr-2 justify-between items-end bg-main-bg-color">
                     <div className=" text-rose-500 text-2xl font-semibold ">
                        Information
                     </div>
                     <AiFillCloseSquare
                        size={35}
                        className="text-black"
                        onClick={handleClose}
                     />
                  </Box>
                  <Information novel={novel} />
                  <Box className="flex justify-center py-3">
                     <FDButton novelId={novel._id} />
                  </Box>
               </Box>
            </Box>
         </Box>
      </Box>
   );
};

export default InformationModal;
