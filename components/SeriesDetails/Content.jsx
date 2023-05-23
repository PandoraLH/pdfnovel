import { Box, Typography, Button } from "@mui/material";
import { AiFillEye } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import TabDownload from "components/SeriesDetails/TabDownload";
import Image from "next/image";
import { useState } from "react";
import InformationModal from "./InformationModal";

const Content = ({ novel }) => {
   const [openModal, setOpenModal] = useState(false);

   const handleOpenModal = () => {
      setOpenModal(true);
   };

   const handleCloseModal = () => {
      setOpenModal(false);
   };

   return (
      <Box className=" bg-zinc-100 rounded-t-md">
         <Box className="pb-5 border-t border-l border-r border-gray-400 rounded-t-md ">
            <Box className="block relative md:hidden">
               <FaBars
                  size={28}
                  className="absolute right-7 top-7"
                  onClick={handleOpenModal}
               />
               <InformationModal isOpen={openModal} isClose = {handleCloseModal} />
            </Box>
            <Box className="flex flex-row p-7 items-center ">
               <div>
                  <Image
                     src={novel.imgSrc}
                     alt={novel.name}
                     width={180}
                     height={180}
                     className="border-[2px] border-white shadow-xl rounded-sm"
                  />
               </div>
               <Box className="flex-1 flex-col pl-6 ">
                  <Typography className="text-4xl text-rose-500 font-semibold pb-2">
                     {novel.name}
                  </Typography>
                  <Box className="flex flex-row justify-between">
                     <Box>
                        <div className="pb-4">
                           <Button className="p-2 bg-cyan-300 text-black rounded-lg shadow-md hover:bg-cyan-400 normal-case">
                              Other Name
                           </Button>
                        </div>
                        <div>
                           <Button className="p-2 bg-gray-800 text-white rounded-md shadow-md hover:bg-gray-500 normal-case  ">
                              Status
                           </Button>
                        </div>
                     </Box>
                     <Box className="flex flex-col mb-3 gap-3">
                        <div className="flex justify-end">
                           <Button className="px-5 py-2 bg-cyan-300 text-black rounded-md shadow-md hover:bg-cyan-400 normal-case gap-2">
                              <AiFillEye size={26} />
                              <Typography className="text-lg text-black">
                                 Follow
                              </Typography>
                           </Button>
                        </div>
                        <div>
                           <Button className="px-4 py-2 bg-gray-800 text-white text-lg rounded-md shadow-md hover:bg-gray-500 normal-case  ">
                              Dicuss on Fourm
                           </Button>
                        </div>
                     </Box>
                  </Box>
               </Box>
            </Box>
            <Box className="px-7">
               <Typography className="text-2xl text-rose-500 font-medium	">
                  Synopsis:
               </Typography>
               <Typography className="text-sm">
                  {novel.description[2].synopsis}
               </Typography>
            </Box>
         </Box>
         <TabDownload pdf={novel.pdfVolume} epub={novel.epubVolume} />
      </Box>
   );
};

export default Content;
