import { Box, Typography, Button } from "@mui/material";
import { FaBars } from "react-icons/fa";
import TabDownload from "components/SeriesDetails/TabDownload";
import Image from "next/image";
import { useState } from "react";
import InformationModal from "./InformationModal";
import FDButton from "./FDButton";

const Content = ({ novel }) => {
   const [openModal, setOpenModal] = useState(false);

   const handleOpenModal = () => {
      setOpenModal(true);
   };

   const handleCloseModal = () => {
      setOpenModal(false);
   };

   const otherNames = novel.otherName;

   return (
      <Box className=" bg-zinc-100 rounded-t-md">
         <Box className="pb-5 border-t border-l border-r border-gray-400 rounded-t-md">
            <Box></Box>
            <Box className="md:hidden flex justify-end p-4">
               <FaBars size={28} className="" onClick={handleOpenModal} />
               <InformationModal
                  isOpen={openModal}
                  isClose={handleCloseModal}
                  novel={novel}
               />
            </Box>
            <Box className="px-2 pb-4 flex flex-row md:p-8 items-center ">
               <div>
                  <Image
                     src={novel.imgSrc ? novel.imgSrc : "/imgnotfound.jpg"}
                     alt={novel.name}
                     width={180}
                     height={180}
                     className="border-[2px] border-white shadow-xl rounded-sm"
                  />
               </div>
               <Box className="flex-1 flex-col pl-4 md:pl-6 ">
                  <Typography className="text-2xl md:text-4xl text-rose-500 font-semibold pb-2">
                     {novel.name}
                  </Typography>
                  <Box className="flex flex-row justify-between gap-5 ">
                     <Box>
                        <div className="pb-4 flex flex-wrap gap-2">
                           {otherNames.map((otherName) => (
                              <Button
                                 className="text-xs md:text-base md:p-2 bg-cyan-300 text-black rounded-lg shadow-md hover:bg-cyan-400 normal-case"
                                 key={otherName._id}
                              >
                                 {otherName.name}
                              </Button>
                           ))}
                        </div>
                        <div>
                           <Button className="p-2 bg-gray-800 text-white rounded-md shadow-md hover:bg-gray-500 normal-case  ">
                              {novel.status}
                           </Button>
                        </div>
                     </Box>
                     <Box className="hidden md:block self-end">
                        <FDButton />
                     </Box>
                  </Box>
               </Box>
            </Box>
            <Box className="px-2 md:px-7">
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
