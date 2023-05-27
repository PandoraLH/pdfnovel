import React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";

const Information = ({ novel }) => {
   const genres = novel.genre;

   return (
      <Box className="flex flex-col">
         <div className="flex justify-center py-3 ">
            <Image src="/logo.png" alt="Logo" width={150} height={150} />
         </div>
         <Box className="flex flex-col">
            <Typography className="flex justify-center text-3xl py-2 px-2 text-rose-500 font-semibold overflow-auto">
               Information
            </Typography>
            <div className="my-2">
               <div className="flex flex-col  items-center border-t text-center border-gray-400 px-5 gap-1 py-1">
                  <Typography className="text-2xl font-semibold">
                     Author
                  </Typography>
                  <Typography className="text-lg cursor-pointer  hover:font-bold hover:text-rose-500">
                     {novel.author}
                  </Typography>
               </div>
               <div className="flex flex-col items-center border-t text-center border-gray-400 px-5 gap-1 py-1">
                  <Typography className="text-2xl font-semibold">
                     Illustrator
                  </Typography>
                  <Typography className="text-lg cursor-pointer hover:font-bold hover:text-rose-500">
                     {novel.illustrator}
                  </Typography>
               </div>
               <div className="flex flex-col items-center text-center border-t  border-gray-400 px-5 gap-1 py-1">
                  <Typography className="text-2xl font-semibold">
                     Translator
                  </Typography>
                  <Typography className="text-lg cursor-pointer hover:font-bold hover:text-rose-500  ">
                     Translator Name
                  </Typography>
               </div>
               <div className="flex flex-col border-t border-gray-400 px-5 gap-1 py-1">
                  <Typography className="text-2xl font-semibold flex justify-center">
                     Genre
                  </Typography>
                  <Box className="flex flex-wrap gap-1">
                     {genres.map((genre) => (
                        <Typography
                           key={genre._id}
                           className="text-lg cursor-pointer hover:font-bold hover:text-rose-500"
                        >
                           {genre.name},
                        </Typography>
                     ))}
                  </Box>
               </div>
            </div>
         </Box>
      </Box>
   );
};

export default Information;
