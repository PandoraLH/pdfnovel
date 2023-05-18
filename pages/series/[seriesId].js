import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
   Box,
   CircularProgress,
   Typography,
   Button,
   Modal,
   Backdrop,
} from "@mui/material";
import Image from "next/image";
import { AiFillEye } from "react-icons/ai";
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
         <Box className="">
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
            </Box>
            <Box className="flex">
               <Box className="w-1/4 bg-gray-200 border-r-[3px] border-gray-400 shadow-xl">
                  <div className="flex justify-center py-3 ">
                     <Image
                        src="/logo.png"
                        alt="Logo"
                        width={150}
                        height={150}
                     />
                  </div>
                  <Box className="flex flex-col  ">
                     <Typography className="flex justify-center text-4xl py-2 text-rose-500 border-gray-500">
                        Information
                     </Typography>
                     <div className="my-2 ">
                        <div className="flex flex-col items-center border-t-[1px] border-gray-500 px-5 gap-1 py-1">
                           <Typography className="text-xl font-semibold">
                              Author
                           </Typography>
                           <Typography className="">Author Name</Typography>
                        </div>
                        <div className="flex flex-col items-center border-t-[1px] border-gray-500 px-5 gap-1 py-1">
                           <Typography className="text-xl font-semibold">
                              Illustrator
                           </Typography>
                           <Typography className="">Author Name</Typography>
                        </div>{" "}
                        <div className="flex flex-col items-center border-t-[1px] border-gray-500 px-5 gap-1 py-1">
                           <Typography className="text-xl font-semibold">
                              Author
                           </Typography>
                           <Typography className="">Author Name</Typography>
                        </div>{" "}
                        <div className="flex flex-col items-center border-t-[1px] border-gray-500 px-5 gap-1 py-1">
                           <Typography className="text-xl font-semibold">
                              Translator
                           </Typography>
                           <Typography className="">Author Name</Typography>
                        </div>{" "}
                        <div className="flex flex-col border-t-[1px] border-gray-500 px-5 gap-1 py-1">
                           <Typography className="text-xl font-semibold flex justify-center">
                              Genre
                           </Typography>
                           <Typography className="">Author Name</Typography>
                        </div>
                     </div>
                  </Box>
               </Box>
               <Box className="w-3/4 bg-slate-50">
                  <Box className="flex justify-between p-5">
                     <Box className="flex flex-row">
                        <div>
                           <Image
                              src={novel.imgSrc}
                              alt="86 Eighty-Six Light Novel Volume 1"
                              width={120}
                              height={120}
                              className="border-[2px] border-white shadow-xl rounded-sm"
                           />
                        </div>
                        <div className="flex flex-col pl-6 justify-center">
                           <Typography className="text-5xl text-rose-500 font-semibold pb-2">
                              {novel.name}
                           </Typography>
                           <div className="pb-4">
                              <Button className="p-2 bg-cyan-300 text-black rounded-lg shadow-md hover:bg-cyan-400 normal-case">
                                 Other Name
                              </Button>
                           </div>
                           <div>
                              <Button className="p-2 bg-gray-800 text-white rounded-md shadow-md hover:bg-gray-500 normal-case  ">
                                 Status
                              </Button>
                           </div>
                        </div>
                     </Box>
                     <Box className="mt-auto">
                        <div className="flex flex-col mb-3 gap-3">
                           <div className="flex justify-center">
                              <Button className="px-5 py-2 bg-cyan-300 text-black rounded-md shadow-md hover:bg-cyan-400 normal-case gap-2">
                                 <AiFillEye size={26} />
                                 <Typography className="text-lg text-black">
                                    Follow
                                 </Typography>
                              </Button>
                           </div>
                           <div>
                              <Button className="px-4 py-2 bg-gray-800 text-white text-lg rounded-md shadow-md hover:bg-gray-500 normal-case  ">
                                 Dicuss on Fourm
                              </Button>
                           </div>
                        </div>
                     </Box>
                  </Box>
                  <hr className="border-1 border-black " />
               </Box>
            </Box>
         </Box>
      </Box>
   );
}

export async function getStaticPaths() {
   try {
      const response = await axios.get(
         "http://localhost:3000/api/novel/getAll"
      );
      const novels = response.data;

      const paths = novels.map((novel) => ({
         params: { seriesId: novel._id },
      }));

      return {
         paths,
         fallback: true,
      };
   } catch (error) {
      console.error("Error fetching novels:", error);
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
         `http://localhost:3000/api/novel/getById/${seriesId}`
      );
      const novel = response.data;

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
