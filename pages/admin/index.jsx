import {
   Box,
   Typography,
   Button,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
} from "@mui/material";
import { GrFormAdd } from "react-icons/gr";
import { AiFillDelete, AiOutlineUnorderedList } from "react-icons/ai";
import axios from "axios";
import TableAdmin from "components/Admin/TableAdmin";
import { useEffect, useState } from "react";
import AddNovel from "components/Admin/AddNovel";

const admin = ({ novels }) => {
   return (
      <Box>
         <TableAdmin novels={novels} />
      </Box>
   );
};

export default admin;

export async function getServerSideProps() {
   try {
      const response = await axios.get(
         "http://localhost:3000/api/novel/getAll"
      );
      const novels = response.data;
      return {
         props: {
            novels,
         },
      };
   } catch (error) {
      console.error("Error fetching novels:", error);
      return {
         props: {
            novels: null,
         },
      };
   }
}
