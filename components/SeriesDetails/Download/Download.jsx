import { Button, Box, Typography } from "@mui/material";

const Download = ({ novels, type }) => {
   const handleDownloadClick = (link) => {
      window.open(link, "_blank");
   };

   return (
      <Box>
         <Box className="py-6 px-2 md:px-4">
            <Typography className="pb-4 text-2xl justify-center flex text-rose-500 font-semibold">
               DOWNLOAD HERE
            </Typography>
            <Box className="flex flex-col gap-4 ">
               {novels.map((novel) => (
                  <Box className="flex flex-row items-center justify-between gap-4">
                     <Typography>{novel.name}</Typography>
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
      </Box>
   );
};

export default Download;
