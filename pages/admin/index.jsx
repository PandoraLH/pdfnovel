import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import TableAdmin from "components/Admin/TableAdmin";
import { useEffect, useState } from "react";

const admin = () => {
   const [novels, setNovels] = useState([]);
   const [loading, setLoading] = useState(true); // Added loading state

   useEffect(() => {
      async function fetchNovels() {
         try {
            const response = await axios.get(
               "http://localhost:3000/api/novel/getAll"
            );
            const fetchedNovels = response.data;
            setNovels(fetchedNovels);
            setLoading(false);
         } catch (error) {
            console.error("Error fetching novels:", error);
            setLoading(false);
         }
      }
      fetchNovels();
   }, [novels]);

   return (
      <Box>
         {loading ? (
            <Box
               display="flex"
               justifyContent="center"
               alignItems="center"
               height="200px"
            >
               <CircularProgress /> {/* Show CircularProgress while loading */}
            </Box>
         ) : (
            <TableAdmin novels={novels} />
         )}
      </Box>
   );
};

export default admin;
