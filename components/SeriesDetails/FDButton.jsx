import { Box, Typography, Button } from "@mui/material";
import { AiFillEye } from "react-icons/ai";

const FDButton = () => {
   return (
      <Box className="flex flex-col gap-3 ">
         <Button className="px-5 py-2 bg-main-bg-color text-black rounded-md shadow-md hover:bg-rose-400 normal-case gap-2">
            <AiFillEye size={26} />
            <Typography className="text-lg text-black">Follow</Typography>
         </Button>
         <Button className="px-4 py-1 bg-gray-800 text-white text-lg rounded-md shadow-md hover:bg-gray-500 normal-case  ">
            Dicuss
         </Button>
      </Box>
   );
};

export default FDButton;
