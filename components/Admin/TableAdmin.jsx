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
   Checkbox,
} from "@mui/material";
import { GrFormAdd } from "react-icons/gr";
import { AiFillDelete, AiOutlineUnorderedList } from "react-icons/ai";
import Link from "next/link";
import AddNovel from "components/Admin/AddNovel";
import { useState } from "react";
import { toast } from "react-hot-toast";

const TableAdmin = ({ novels }) => {
   const [selectedNovels, setSelectedNovels] = useState([]);
   const [openAddNovels, setOpenAddNovels] = useState(false);

   const handleAddNovelsClick = () => {
      setOpenAddNovels(!openAddNovels);
   };

   const handleCheckboxChange = (novelId) => {
      if (selectedNovels.includes(novelId)) {
         setSelectedNovels(selectedNovels.filter((id) => id !== novelId));
      } else {
         setSelectedNovels([...selectedNovels, novelId]);
      }
   };

   {
      for (const novelId of selectedNovels) {
         console.log(novelId);
      }
   }

   const handleDeleteNovels = async () => {
      try {
         for (const novelId of selectedNovels) {
            const response = await fetch(
               `http://localhost:3000/api/admin/delete/${novelId}`,
               {
                  method: "DELETE",
               }
            );

            if (!response.ok) {
               toast.error("Error deleting novel");
            }
         }

         toast.success("Novel deleted successfully");
         // Perform any necessary UI updates or data refetching after deletion
      } catch (error) {
         toast.error("Error deleting novel");
      }
   };

   return (
      <Box>
         {openAddNovels ? (
            <Box className="w-full flex flex-row gap-4 bg-slate-200 p-4">
               <Box className="w-1/5 h-full flex flex-col bg-zinc-100 p-4 gap-4 rounded-md shadow-md ">
                  <Button
                     className="bg-main-bg-color rounded-md shadow-md hover:bg-rose-400 py-2 pl-4 gap-2"
                     onClick={handleAddNovelsClick}
                  >
                     <AiOutlineUnorderedList size={24} className="text-black" />
                     <Typography className="text-black">List Novel</Typography>
                  </Button>
               </Box>
               <Box className="w-4/5 bg-zinc-100 ">
                  <AddNovel />
               </Box>
            </Box>
         ) : (
            <Box className="w-full flex flex-row gap-4 bg-slate-200 p-4">
               <Box className="w-1/5 h-full flex flex-col bg-zinc-100 p-4 gap-4 rounded-md shadow-md ">
                  <Button
                     className="bg-main-bg-color rounded-md shadow-md hover:bg-rose-400 py-2 pl-4 gap-2"
                     onClick={handleAddNovelsClick}
                  >
                     <GrFormAdd size={24} />
                     <Typography className="text-black">Add New LN</Typography>
                  </Button>
                  <Button className="bg-main-bg-color rounded-md shadow-md hover:bg-rose-400 py-2 pl-4 gap-2">
                     <AiFillDelete size={24} className="text-black" />
                     <Typography
                        className="text-black"
                        onClick={handleDeleteNovels}
                     >
                        Delete Novel
                     </Typography>
                  </Button>
               </Box>
               <Box className="w-4/5 bg-zinc-100 ">
                  <TableContainer className=" h-screen overflow-y-scroll">
                     <Table>
                        <TableHead className="bg-main-bg-color ">
                           <TableRow>
                              <TableCell className="text-lg font-semibold">
                                 Checkbox
                              </TableCell>
                              <TableCell className="text-lg font-semibold">
                                 _id
                              </TableCell>
                              <TableCell className="text-lg font-semibold">
                                 Name
                              </TableCell>
                              <TableCell className="text-lg font-semibold">
                                 Author
                              </TableCell>
                              <TableCell className="text-lg font-semibold">
                                 Illustrator
                              </TableCell>
                              <TableCell className="text-lg font-semibold">
                                 Status
                              </TableCell>
                           </TableRow>
                        </TableHead>
                        <TableBody>
                           {novels &&
                              novels.map((novel) => (
                                 <TableRow key={novel._id}>
                                    <TableCell>
                                       <Checkbox
                                          checked={selectedNovels.includes(
                                             novel._id
                                          )}
                                          onChange={() =>
                                             handleCheckboxChange(novel._id)
                                          }
                                       />
                                    </TableCell>
                                    <TableCell>
                                       <Link
                                          className="cursor-pointer hover:text-rose-500 hover:font-semibold"
                                          href={`/admin/${novel._id}`}
                                       >
                                          {novel._id}
                                       </Link>
                                    </TableCell>

                                    <TableCell>
                                       <Link
                                          className="cursor-pointer hover:text-rose-500 hover:font-semibold"
                                          href={`/admin/${novel._id}`}
                                       >
                                          {novel.name}
                                       </Link>
                                    </TableCell>
                                    <TableCell>{novel.author}</TableCell>
                                    <TableCell>{novel.illustrator}</TableCell>
                                    <TableCell>{novel.status}</TableCell>
                                 </TableRow>
                              ))}
                        </TableBody>
                     </Table>
                  </TableContainer>
               </Box>
            </Box>
         )}
      </Box>
   );
};

export default TableAdmin;
