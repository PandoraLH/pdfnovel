import Layout from "@/Layout/Layout";
import MyCarousel from "components/HomePage/MyCarousel";
import Image from "next/image";
import axios from "axios";
import { Box, Button } from "@mui/material";
import ListNovel from "components/HomePage/ListNovel";

export default function HomePage({ latestNovels }) {
   return (
      <Box className="bg-zinc-100">
         <Image src="/cover.jpg" width={1152} height={200} />
         <MyCarousel novels={latestNovels} />
         <ListNovel novels={latestNovels} />
      </Box>
   );
}

export async function getServerSideProps() {
   try {
      const response = await axios.get(
         "http://localhost:3000/api/novel/getLastest"
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
