import React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";

const Blur = () => {
   return (
      <div>
         <Box
            sx={{
               position: "relative",
               width: "100%",
               height: "128px",
               margin: "0 auto",
            }}
         >
            <Box
               sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(128, 128, 128, 0.5)",
               }}
            />
            {/* Your content inside the blur component */}
            <h1>Blur Component</h1>
         </Box>{" "}
      </div>
   );
};

export default Blur;
