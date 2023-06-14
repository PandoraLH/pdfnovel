import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import Information from "components/SeriesDetails/Information/Information";
import Content from "components/SeriesDetails/Content";
import { AiFillHome } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { getSession } from "next-auth";
import db from "@/utils/db";
import { data } from "@/models/data";

export default function SeriesPage({ novel }) {
   const router = useRouter();

   useEffect(() => {
      if (!novel) {
         router.push("/404"); // Redirect to a 404 page if novel data is not available
      }
   }, [novel, router]);

   if (!novel) {
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
      <Box className="w-full">
         <Box className="bg-slate-200">
            <Box className="py-5">
               <Button
                  className="bg-zinc-100 flex flex-row items-center gap-2 px-3 rounded-md shadow-md"
                  onClick={() => router.back()}
               >
                  <IoIosArrowBack size={26} className="text-black" />
                  <Box className="flex flex-row items-center gap-1">
                     <Typography className="text-lg text-black">
                        {" "}
                        Back
                     </Typography>
                  </Box>
               </Button>
            </Box>
            <Box className="flex md:gap-4 lg:gap-8 xl:gap-10 ">
               <Box className="w-full md:w-4/5 ">
                  <Content novel={novel} />
               </Box>
               <Box className="hidden md:block w-1/4 ">
                  <Box className="mr-3 bg-zinc-100 rounded-xl border border-gray-400 shadow-xl">
                     <Information novel={novel} />
                  </Box>
               </Box>
            </Box>
         </Box>
      </Box>
   );
}

export async function getStaticPaths() {
   try {
      await db.connect();
      const novels = await data.find({}).select("_id");
      const novelIds = novels.map((novel) => novel._id.toString());
      const paths = novelIds.map((novelId) => ({
         params: { seriesId: novelId },
      }));
      return {
         paths,
         fallback: false,
      };
   } catch (error) {
      console.error("Error fetching novel IDs:", error);
      return {
         paths: [],
         fallback: false,
      };
   } finally {
      await db.disconnect();
   }
}

export async function getStaticProps({ params }) {
   const { seriesId } = params;
   try {
      await db.connect();
      const novelDoc = await data.findById(seriesId);
      const novel = JSON.parse(JSON.stringify(novelDoc));

      return {
         props: {
            novel,
         },
      };
   } catch (error) {
      console.error("Error fetching novel:", error);

      return {
         props: {
            novel: null,
         },
      };
   }
}
