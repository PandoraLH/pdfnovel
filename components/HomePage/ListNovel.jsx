import React from "react";
import { Box, useMediaQuery, Typography, Button } from "@mui/material";
import Image from "next/image";
import { GrFormNext } from "react-icons/gr";
import { useRouter } from "next/router";
import YourLibrary from "./YourLibrary";

const ListNovel = ({ novels }) => {
   const router = useRouter();

   const isResponsive = useMediaQuery("(max-width: 768px)");

   const gridTemplateColumns = isResponsive
      ? "repeat(3, 1fr)"
      : "repeat(6, 1fr)";
   const gridTemplateRows = isResponsive ? "repeat(6, 1fr)" : "repeat(3, 1fr)";

   return (
      <Box className="w-full flex flex-col md:flex-row md:gap-4 mt-6">
         <Box className="md:w-4/5 border-t md:border-r border-gray-300">
            <Box className=" w-full h-16 flex justify-center my-2 ">
               <Image src="/logo.png" width={64} height={64} alt="logo" />
            </Box>
            <Box className="px-2 md:px-4  flex flex-col gap-4">
               <Box className="flex ">
                  <Typography className="text-4xl text-white font-semibold cursor-pointer bg-main-bg-color px-2 py-1">
                     Latest Release
                  </Typography>
               </Box>
               <Box
                  style={{
                     display: "grid",
                     gridTemplateColumns,
                     gridTemplateRows,
                     gap: "20px",
                  }}
               >
                  {novels.map((item) => (
                     <Box
                        key={item._id}
                        className="flex flex-col h-full cursor-pointer"
                        onClick={() => {
                           router.push(`/series/${item._id}`);
                        }}
                     >
                        <Box className="h-4/5 w-full">
                           <Image
                              src={
                                 item.imgSrc ? item.imgSrc : "/imgnotfound.jpg"
                              }
                              alt={item.name}
                              width={0}
                              height={0}
                              sizes="(max-width: 768px) 100vw,
                           (max-width: 1200px) 50vw,
                           33vw"
                              className="h-full w-full"
                           />
                           <Box className="relative bottom-10 ">
                              <Typography className=" line-clamp-2 text-left pl-2 text-lg bg-gray-400/60 text-white font-bold ">
                                 {item.pdfVolume.length > 0 &&
                                    item.pdfVolume[item.pdfVolume.length - 1]
                                       .name}
                              </Typography>
                           </Box>
                        </Box>
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
               <Button
                  className=" bg-main-bg-color rounded-md shadow-md hover:bg-rose-400 pl-4 py-2 gap-2"
                  onClick={() => {
                     router.push("/series");
                  }}
               >
                  <Typography className=" text-black">See More</Typography>
                  <GrFormNext size={24} />
               </Button>
            </Box>
         </Box>
         <Box className=" md:w-1/5">
            <YourLibrary />
         </Box>{" "}
      </Box>
   );
};

export default ListNovel;
