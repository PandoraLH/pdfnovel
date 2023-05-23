import { Button, Box, Typography } from "@mui/material";

const Download = ({ novels, type }) => {
   const handleDownloadClick = (link) => {
      window.open(link, "_blank");
   };

   return (
      <Box className="px-4">
         <Typography className="pt-6 pb-4 text-xl">DOWNLOAD HERE</Typography>
         <Box className="flex flex-col gap-4">
            {novels.map((novel, index) => (
               <Box className="flex flex-row gap-5 items-center">
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
   );
};

export default Download;
