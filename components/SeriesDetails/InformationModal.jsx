import { useState, useEffect, useCallback } from "react";
import { Box, Typography, Button } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import { AiFillCloseSquare } from "react-icons/ai";
import Image from "next/image";

const InformationModal = ({ isOpen, isClose }) => {
   const [showModal, setShowModal] = useState(isOpen);
   console.log(showModal);

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
      <Box className="fixed inset-0 z-10 outline-none focus:outline-none bg-neutral-800/70">
         <Box
            className={`
                translate 
                duration-300 
                h-full 
                ${showModal ? "translate-x-0" : "translate-x-full"}
                ${showModal ? "opacity-100" : "opacity-0"}`}
         >
            <Box className="translate h-full w-1/3 shadow-lg  absolute right-0 bg-zinc-100 outline-none focus:outline-none">
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
                  <Box className="">
                     <div className="flex justify-center py-3 ">
                        <Image
                           src="/logo.png"
                           alt="Logo"
                           width={150}
                           height={150}
                        />
                     </div>
                     <div className="my-2">
                        <div className="flex flex-col items-center border-t border-gray-400 px-5 gap-1 py-1">
                           <Typography className="text-xl font-semibold">
                              Author
                           </Typography>
                           <Typography className="">Author Name</Typography>
                        </div>
                        <div className="flex flex-col items-center border-t border-gray-400 px-5 gap-1 py-1">
                           <Typography className="text-xl font-semibold">
                              Illustrator
                           </Typography>
                           <Typography className="">Author Name</Typography>
                        </div>
                        <div className="flex flex-col items-center border-t border-gray-400 px-5 gap-1 py-1">
                           <Typography className="text-xl font-semibold">
                              Author
                           </Typography>
                           <Typography className="">Author Name</Typography>
                        </div>
                        <div className="flex flex-col items-center border-t border-gray-400 px-5 gap-1 py-1">
                           <Typography className="text-xl font-semibold">
                              Translator
                           </Typography>
                           <Typography className="">Author Name</Typography>
                        </div>
                        <div className="flex flex-col border-t border-gray-400 px-5 gap-1 py-1">
                           <Typography className="text-xl font-semibold flex justify-center">
                              Genre
                           </Typography>
                           <Typography className="">Author Name</Typography>
                        </div>
                     </div>
                  </Box>
               </Box>
            </Box>
         </Box>
      </Box>
   );
};

export default InformationModal;
