import { Box, Typography, Button } from "@mui/material";
import { AiFillEye } from "react-icons/ai";
import TabDownload from "components/SeriesDetails/TabDownload";
import Image from "next/image";

const Content = ({ novel }) => {
   return (
      <Box className=" bg-zinc-100 rounded-t-md">
         <Box className="pb-5  border-t border-l border-r border-gray-400 rounded-t-md ">
            <Box className="flex justify-between p-5 ">
               <Box className="flex flex-row">
                  <div>
                     <Image
                        src={novel.imgSrc}
                        alt={novel.name}
                        width={120}
                        height={120}
                        className="border-[2px] border-white shadow-xl rounded-sm"
                     />
                  </div>
                  <div className="flex flex-col pl-6 justify-center">
                     <Typography className="text-5xl text-rose-500 font-semibold pb-2">
                        {novel.name}
                     </Typography>
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
                  </div>
               </Box>
               <Box className="mt-auto">
                  <div className="flex flex-col mb-3 gap-3">
                     <div className="flex justify-center">
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
                  </div>
               </Box>
            </Box>
            {/* <hr className="border-1 border-black " /> */}
            <Box className="px-5">
               <Typography className="text-2xl text-rose-500 font-medium	">
                  Synopsis:
               </Typography>
               <Typography className="text-sm">
                  {novel.description[2].synopsis}
               </Typography>
            </Box>
         </Box>
         {/* <hr className="border-1 border-black " /> */}
         <TabDownload pdf={novel.pdfVolume} epub={novel.epubVolume} />
      </Box>
   );
};

export default Content;
