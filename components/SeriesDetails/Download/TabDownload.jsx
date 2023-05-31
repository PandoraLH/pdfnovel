import { Button, Box } from "@mui/material";
import { borderTop } from "@mui/system";
import { useState } from "react";
import Information from "../Information/Information";
import Download from "./Download";

const Tab = ({ label, onClick, active, style }) => {
   return (
      <Button
         sx={{
            border: "none",
            borderRadius: "0",
            borderBottom: "none",
            fontWeight: "500",
            fontSize: "18px",
            lineHeight: "28px",
            padding: "10px 20px",
            overflow: "hidden",
            ...style,
         }}
         className={active ? " text-rose-500 font-semibold" : " text-gray-600"}
         onClick={onClick}
      >
         {label}
      </Button>
   );
};

const TabDownload = ({ pdf, epub }) => {
   const [activeTab, setActiveTab] = useState(1);

   const handleTabClick = (tabNumber) => {
      setActiveTab(tabNumber);
   };

   return (
      <Box>
         <Box className="flex flex-row border-r border-gray-400 ">
            <Box className="flex flex-row ">
               <Tab
                  label="PDF"
                  onClick={() => handleTabClick(1)}
                  active={activeTab === 1}
                  style={{
                     borderLeft: "1px solid black",
                     borderTop: "1px solid black",
                     borderRight: "1px solid black",
                     borderRadius: "5px 5px 0 0",
                  }}
               />
               <Tab
                  label="EPUB"
                  onClick={() => handleTabClick(2)}
                  active={activeTab === 2}
                  style={{
                     borderRight: "1px solid black",
                     borderTop: "1px solid black",
                     borderRadius: "5px 5px 0 0",
                  }}
               />
            </Box>

            <div className="flex-1 border-b border-black "></div>
         </Box>
         <Box className="border-l border-r border-black">
            {activeTab === 1 && <Download novels={pdf} type="pdf" />}
            {activeTab === 2 && <Download novels={epub} type="epub" />}
         </Box>
      </Box>
   );
};

export default TabDownload;
