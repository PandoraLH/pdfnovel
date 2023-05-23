import { Button, Box, Typography } from "@mui/material";
import Comment from "./Comment";

const Download = ({ novels, type }) => {
   const handleDownloadClick = (link) => {
      window.open(link, "_blank");
   };

   return (
      <Box>
         <Box className="py-6 px-4">
            <Typography className="pb-4 text-2xl justify-center flex text-rose-500 font-semibold">
               DOWNLOAD HERE
            </Typography>
            <Box className="flex flex-col gap-4">
               {novels.map((novel, index) => (
                  <Box className="flex flex-row items-center justify-between px-5 ">
                     <Typography>
                        Volume {index + 1} {type === "pdf" ? "PDF" : "EPUB"}{" "}
                     </Typography>
                     <Button
                        className="px-5 py-2 bg-cyan-300 text-black rounded-md shadow-md hover:bg-cyan-400 normal-case gap-2"
                        onClick={() => handleDownloadClick(novel.link)}
                     >
                        DOWNLOAD
                     </Button>
                  </Box>
               ))}
            </Box>
         </Box>
         <hr className=" border-black" />
         <Comment />
      </Box>
   );
};

export default Download;
