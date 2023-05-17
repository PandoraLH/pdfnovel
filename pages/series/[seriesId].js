import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function SeriesPage({ book }) {
   const router = useRouter();

   useEffect(() => {
      if (!book) {
         router.push("/404"); // Redirect to a 404 page if book data is not available
      }
   }, [book, router]);

   if (!book) {
      return (
         <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
         >
            <CircularProgress />
         </Box>
      );
   }

   return (
      <Box className="flex justify-center">
         <Box maxWidth="1152px" mx="auto" p={4}>
            Test
         </Box>
      </Box>
   );
}

export async function getStaticPaths() {
   try {
      const response = await axios.get("http://localhost:3000/api/book/getAll");
      const books = response.data;

      const paths = books.map((book) => ({
         params: { seriesId: book._id },
      }));

      return {
         paths,
         fallback: true,
      };
   } catch (error) {
      console.error("Error fetching books:", error);
      return {
         paths: [],
         fallback: true,
      };
   }
}

export async function getStaticProps({ params }) {
   const { seriesId } = params;

   try {
      const response = await axios.get(
         `http://localhost:3000/api/book/getById/${seriesId}`
      );
      const book = response.data;

      return {
         props: {
            book,
         },
      };
   } catch (error) {
      console.error("Error fetching book:", error);

      return {
         props: {
            book: null,
         },
      };
   }
}
