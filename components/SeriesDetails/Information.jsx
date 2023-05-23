import React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";

const Information = () => {
   return (
      <div className=" bg-zinc-100 mr-3 rounded-xl border border-gray-400 shadow-xl">
         <div className="flex justify-center py-3 ">
            <Image src="/logo.png" alt="Logo" width={150} height={150} />
         </div>
         <Box className="flex flex-col">
            <Typography className="flex justify-center text-3xl py-2 px-2 text-rose-500 border-gray-500">
               Information
            </Typography>
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
      </div>
   );
};

export default Information;
