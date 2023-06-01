import React from "react";
import { Box, useMediaQuery, Typography, Button } from "@mui/material";
import Image from "next/image";
import { GrFormNext } from "react-icons/gr";

const ListNovel = ({ novels }) => {
   const isResponsive = useMediaQuery("(max-width: 768px)");

   const gridTemplateColumns = isResponsive
      ? "repeat(3, 1fr)"
      : "repeat(6, 1fr)";
   const gridTemplateRows = isResponsive ? "repeat(6, 1fr)" : "repeat(3, 1fr)";

   return (
      <Box className="w-full flex flex-col md:flex-row md:gap-4 mt-6">
         <Box className="md:w-4/5 border-t md:border-r border-gray-300">
            <Box className=" w-full h-16 flex justify-center mt-2">
               <Image src="/logo.png" width={64} height={64} />
            </Box>
            <Box className="p-2 md:px-6 md:py-4">
               <Typography className="text-3xl text-rose-500 font-semibold cursor-pointer underline pb-5">
                  Lastest Release
               </Typography>
               <Box
                  style={{
                     display: "grid",
                     gridTemplateColumns,
                     gridTemplateRows,
                     gap: "25px",
                  }}
               >
                  {novels.map((item) => (
                     <Box
                        key={item._id}
                        className="flex flex-col h-full cursor-pointer"
                     >
                        <Image
                           src={item.imgSrc ? item.imgSrc : "/imgnotfound.jpg"}
                           width={0}
                           height={0}
                           sizes="(max-width: 768px) 100vw,
                           (max-width: 1200px) 50vw,
                           33vw"
                           className="h-4/5 w-full"
                        />
                        <Box className="h-1/5">
                           <Typography className="pt-1 text-center line-clamp-2 text-sm font-semibold ">
                              {item.name}
                           </Typography>
                        </Box>
                     </Box>
                  ))}
               </Box>
            </Box>
            <Box className="flex justify-end pr-2 py-4 md:pr-6">
               <Button className="bg-cyan-300 rounded-md shadow-md hover:bg-cyan-400 pl-4 py-2 gap-2">
                  <Typography className=" text-black">See More</Typography>
                  <GrFormNext size={24} />
               </Button>
            </Box>
         </Box>
         <Box className=" md:w-1/5">
            <Box className="py-5 px-2">
               <Typography className="text-2xl text-rose-500 font-semibold cursor-pointer flex justify-center md:block">
                  Your Library
               </Typography>{" "}
               <ul className="list-disc pl-5 pt-2">
                  <li>Novel 1</li>
                  <li>Novel 2</li>
                  <li>Novel 3</li>
                  <li>Novel 4</li>
                  <li>Novel 5</li>
               </ul>
            </Box>
         </Box>{" "}
      </Box>
   );
};

export default ListNovel;
