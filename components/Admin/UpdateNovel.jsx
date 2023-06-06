import { useForm, useFieldArray } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import Link from "next/link";
import { AiFillDelete, AiOutlineUnorderedList } from "react-icons/ai";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

const UpdateNovel = ({ novel }) => {
   const router = useRouter();
   const { register, handleSubmit, control, reset } = useForm({
      defaultValues: novel,
   });
   const {
      fields: genreFields,
      append: appendGenre,
      remove: removeGenre,
   } = useFieldArray({
      control,
      name: "genre",
   });
   const {
      fields: otherNameFields,
      append: appendOtherName,
      remove: removeOtherName,
   } = useFieldArray({
      control,
      name: "otherName",
   });
   const {
      fields: pdfVolumeFields,
      append: appendPdfVolume,
      remove: removePdfVolume,
   } = useFieldArray({
      control,
      name: "pdfVolume",
   });
   const {
      fields: epubVolumeFields,
      append: appendEpubVolume,
      remove: removeEpubVolume,
   } = useFieldArray({
      control,
      name: "epubVolume",
   });

   const handleDeleteNovel = async () => {
      try {
         const response = await axios.delete(`/api/admin/delete/${novel._id}`);

         if (response.status === 200) {
            toast.success("Novel deleted successfully");
            router.push("/admin"); // Navigate to /admin after successful delete
         } else {
            toast.error("Failed to delete novel");
         }
      } catch (error) {
         console.error("Error:", error);
         toast.error("An error occurred");
      }
   };
   const onSubmit = async (data) => {
      try {
         const response = await axios.post(
            `http://localhost:3000/api/admin/update/${novel._id}`,
            data
         );
         if (response.status === 200) {
            toast.success("Novel updated successfully");
            router.push("/admin");
         } else {
            toast.error("Failed to update novel");
         }
      } catch (error) {
         console.error("Error:", error);
         toast.error("An error occurred");
      }
   };

   return (
      <Box className="w-full flex flex-row gap-4 bg-slate-200 p-4">
         <Box className="w-1/5 h-full flex flex-col bg-zinc-100 p-4 gap-4 rounded-md shadow-md ">
            <Button
               className="bg-main-bg-color rounded-md shadow-md hover:bg-rose-400 py-2 pl-4 gap-2"
               onClick={() => {
                  router.push("/admin");
               }}
            >
               <AiOutlineUnorderedList className="text-black" size={24} />
               <Typography className="text-black">List Novel</Typography>
            </Button>
            <Button
               className="bg-main-bg-color rounded-md shadow-md hover:bg-rose-400 py-2 pl-4 gap-2"
               onClick={handleDeleteNovel}
            >
               <AiFillDelete size={24} className="text-black" />
               <Typography className="text-black">Delete Novel</Typography>
            </Button>
         </Box>
         <Box className="w-4/5 bg-zinc-100 ">
            <Typography className="flex justify-center text-2xl text-rose-500 font-semibold pt-4">
               Add Novel
            </Typography>
            <form
               onSubmit={handleSubmit(onSubmit)}
               className="flex flex-col gap-5 p-5"
            >
               <TextField
                  label="Name"
                  {...register("name", { required: true })}
                  defaultValue={novel.name}
                  fullWidth
               />
               <TextField
                  label="Href"
                  {...register("href")}
                  defaultValue={novel.href}
                  fullWidth
               />
               <TextField
                  label="Image Source"
                  {...register("imgSrc")}
                  defaultValue={novel.imgSrc}
                  fullWidth
               />
               <TextField
                  label="Author"
                  {...register("author")}
                  defaultValue={novel.author}
                  fullWidth
               />
               <TextField
                  label="Illustrator"
                  {...register("illustrator")}
                  defaultValue={novel.illustrator}
                  fullWidth
               />
               <TextField
                  label="Status"
                  {...register("status")}
                  defaultValue={novel.status}
                  fullWidth
               />
               <div className="">
                  <label>Description:</label>
                  <div className="ml-4 mt-4 flex flex-col gap-4">
                     <TextField
                        {...register("description[0].panel")}
                        label="Panel"
                        defaultValue={novel.description[0].panel}
                        fullWidth
                     />
                     <TextField
                        {...register("description[1].description")}
                        label="Description"
                        multiline
                        defaultValue={novel.description[1].description}
                        fullWidth
                     />
                     <TextField
                        {...register("description[2].synopsis")}
                        label="Synopsis"
                        multiline
                        defaultValue={novel.description[2].synopsis}
                        fullWidth
                     />
                  </div>
               </div>
               <div>
                  <label>Genre:</label>
                  {genreFields.map((field, index) => (
                     <div key={field.id} className="flex flex-row gap-4 my-2">
                        <TextField
                           {...register(`genre.${index}.name`)}
                           defaultValue={field.name}
                           fullWidth
                        />
                        <Button
                           type="button"
                           onClick={() => removeGenre(index)}
                           variant="outlined"
                           color="error"
                        >
                           Remove
                        </Button>
                     </div>
                  ))}
                  <Button
                     type="button"
                     onClick={() => appendGenre({ name: "" })}
                     variant="outlined"
                     color="primary"
                     className="mt-4"
                  >
                     Add Genre
                  </Button>
               </div>
               <div>
                  <label>Other Name:</label>
                  {otherNameFields.map((field, index) => (
                     <div key={field.id} className="flex flex-row gap-4 my-2">
                        <TextField
                           {...register(`otherName.${index}.name`)}
                           defaultValue={field.name}
                           fullWidth
                        />
                        <Button
                           type="button"
                           onClick={() => removeOtherName(index)}
                           variant="outlined"
                           color="error"
                        >
                           Remove
                        </Button>
                     </div>
                  ))}
                  <Button
                     type="button"
                     onClick={() => appendOtherName({ name: "" })}
                     variant="outlined"
                     color="primary"
                     className="mt-4"
                  >
                     Add Other Name
                  </Button>
               </div>
               <div>
                  <label>PDF Volumes:</label>
                  {pdfVolumeFields.map((field, index) => (
                     <div key={field.id} className="flex flex-row gap-4 my-2">
                        <TextField
                           label="Name"
                           {...register(`pdfVolume.${index}.name`)}
                           defaultValue={field.name}
                           fullWidth
                        />
                        <TextField
                           label="Link"
                           {...register(`pdfVolume.${index}.link`)}
                           defaultValue={field.link}
                           fullWidth
                        />
                        <Button
                           type="button"
                           onClick={() => removePdfVolume(index)}
                           variant="outlined"
                           color="error"
                        >
                           Remove
                        </Button>
                     </div>
                  ))}
                  <Button
                     type="button"
                     onClick={() => appendPdfVolume({ name: "", link: "" })}
                     variant="outlined"
                     color="primary"
                     className=" bg-main-bg-color text-black p-2 mt-4"
                  >
                     Add PDF Volume
                  </Button>
               </div>
               <div>
                  <label>EPUB Volumes:</label>
                  {epubVolumeFields.map((field, index) => (
                     <div key={field.id} className="flex flex-row gap-4 my-2">
                        <TextField
                           label="Name"
                           {...register(`epubVolume.${index}.name`)}
                           defaultValue={field.name}
                           fullWidth
                        />
                        <TextField
                           label="Link"
                           {...register(`epubVolume.${index}.link`)}
                           defaultValue={field.link}
                           fullWidth
                        />
                        <Button
                           type="button"
                           onClick={() => removeEpubVolume(index)}
                           variant="outlined"
                           color="error"
                        >
                           Remove
                        </Button>
                     </div>
                  ))}
                  <Button
                     type="button"
                     onClick={() => appendEpubVolume({ name: "", link: "" })}
                     className=" bg-main-bg-color text-black p-2 mt-4"
                  >
                     Add EPUB Volume
                  </Button>
               </div>
               <Button type="submit" className="bg-main-bg-color text-black">
                  Update Novel
               </Button>
            </form>
         </Box>
      </Box>
   );
};

export default UpdateNovel;
