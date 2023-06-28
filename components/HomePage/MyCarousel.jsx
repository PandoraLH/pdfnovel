import React from "react";
import Carousel from "react-material-ui-carousel";
import { Box, useMediaQuery, Typography } from "@mui/material";
import Image from "next/image";
import { FaCrown } from "react-icons/fa";
import { useRouter } from "next/router";

function Item(props) {
   const { items } = props;
   const router = useRouter();

   return (
      <Box className="flex justify-between gap-4 px-4">
         {items.map((item) => (
            <Box
               key={item._id}
               className="cursor-pointer"
               width={250}
               height={300}
               onClick={() => {
                  router.push(`/series/${item._id}`);
               }}
            >
               <Image
                  src={item.imgSrc ? item.imgSrc : "/imgnotfound.jpg"}
                  alt={item.name}
                  width={0}
                  height={0}
                  sizes="(max-width: 768px) 100vw,
                           (max-width: 1200px) 50vw,
                           33vw"
                  style={{ height: "100%", width: "100%" }}
               />
               <Box className="relative bottom-20  ">
                  <Typography className="text-center line-clamp-2 text-xl backdrop-blur-2xl bg-gray-400/60 text-white font-bold ">
                     {item.name}
                  </Typography>
               </Box>
            </Box>
         ))}
      </Box>
   );
}

const MyCarousel = ({ novels }) => {
   const isResponsive = useMediaQuery("(max-width: 768px)");
   const itemsPerPage = isResponsive ? 2 : 5;
   const pages = Math.ceil(novels.length / itemsPerPage);

   const getItemsByPage = (page) => {
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = page * itemsPerPage;
      return novels.slice(startIndex, endIndex);
   };

   return (
      <Box>
         <Box className="w-full flex flex-col md:flex-row md:gap-4 md:h-full">
            <Box className="w-full">
               <Box className="flex flex-row px-4 py-3 gap-2">
                  <Box className="flex justify-end mt-auto gap-2 bg-main-bg-color px-2 py-1">
                     <FaCrown size={24} />
                     <Typography className="text-lg text-white font-semibold cursor-pointer">
                        Hot
                     </Typography>
                  </Box>
                  <Box className="p-1">
                     <Typography className="text-lg text-zinc-500 hover:text-rose-500 font-semibold cursor-pointer">
                        This Month
                     </Typography>
                  </Box>
                  <Box className="p-1">
                     <Typography className="text-lg text-zinc-500 hover:text-rose-500 font-semibold cursor-pointer">
                        All Time
                     </Typography>
                  </Box>
               </Box>
               <Box>
                  <Carousel>
                     {Array.from({ length: pages }, (_, index) => (
                        <Item key={index} items={getItemsByPage(index + 1)} />
                     ))}
                  </Carousel>
               </Box>
            </Box>
            {/* <Box className=" md:w-1/5 md:h-full">
               <Box className="py-5 px-2 border-">
                  <Typography className="text-2xl text-white bg-main-bg-color font-semibold cursor-pointer flex justify-center ">
                     Forum Topic
                  </Typography>{" "}
                  <ul className="list-disc pl-5 pt-2">
                     <li>Forum Topic 1</li>
                     <li>Forum Topic 2</li>
                     <li>Forum Topic 3</li>
                     <li>Forum Topic 4</li>
                     <li>Forum Topic 5</li>
                  </ul>
               </Box>
            </Box> */}
         </Box>
      </Box>
   );
};

export default MyCarousel;
