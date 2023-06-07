import Layout from "@/Layout/Layout";
import MyCarousel from "components/HomePage/MyCarousel";
import Image from "next/image";
import axios from "axios";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import ListNovel from "components/HomePage/ListNovel";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function HomePage({ latestNovels }) {
   const router = useRouter();

   useEffect(() => {
      if (!latestNovels) {
         router.push("/404"); // Redirect to a 404 page if novel data is not available
      }
   }, [latestNovels, router]);

   if (!latestNovels) {
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
      <Box className="bg-zinc-100">
         <Image
            src="/cover.jpg"
            width={1152}
            height={200}
            alt="cover"
            priority={true}
            className="w-full"
         />
         <MyCarousel novels={latestNovels} />
         <ListNovel novels={latestNovels} />
      </Box>
   );
}

export async function getServerSideProps() {
   try {
      const response = await axios.get(
         `${process.env.NEXT_PUBLIC_BASE_URL}/api/novel/getLatest`
      );
      const latestNovels = response.data;

      return {
         props: {
            latestNovels,
         },
      };
   } catch (error) {
      console.error("Failed to fetch latest novels:", error);
      return {
         props: {
            latestNovels: null,
         },
      };
   }
}
