import { Button, Box, Typography } from "@mui/material";

const Download = ({ name, volumes, type }) => {
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
               {volumes.map((volume) => (
                  <Box
                     key={volume._id}
                     className="flex flex-row items-center justify-between gap-4"
                  >
                     <Typography>
                        {name} {volume.name} {type.toUpperCase()}
                     </Typography>
                     <Button
                        className="px-5 py-2 bg-sky-300 text-black rounded-md shadow-md hover:bg-sky-500 normal-case gap-2"
                        onClick={() => handleDownloadClick(volume.link)}
                     >
                        DOWNLOAD
                     </Button>
                  </Box>
               ))}
            </Box>
         </Box>
      </Box>
   );
};

export default Download;
