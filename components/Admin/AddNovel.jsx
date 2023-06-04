import { useForm, useFieldArray } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";
import { toast } from "react-hot-toast";

const AddNovelForm = () => {
   const { register, handleSubmit, control, reset } = useForm();
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

   const onSubmit = async (data) => {
      try {
         await axios.post("http://localhost:3000/api/admin/addData", data);
         toast.success("Novel added successfully");
         reset();
      } catch (error) {
         toast.error("Error adding novel");
      }
   };

   return (
      <Box>
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
               fullWidth
            />
            <TextField label="Href" {...register("href")} fullWidth />
            <TextField label="Image Source" {...register("imgSrc")} fullWidth />
            <TextField label="Author" {...register("author")} fullWidth />
            <TextField
               label="Illustrator"
               {...register("illustrator")}
               fullWidth
            />
            <TextField label="Status" {...register("status")} fullWidth />
            <div className="">
               <label>Description:</label>
               <div className="ml-4 mt-4 flex flex-col gap-4">
                  <TextField
                     {...register("description[0].panel")}
                     label="Panel"
                     fullWidth
                  />
                  <TextField
                     {...register("description[1].description")}
                     label="Description"
                     multiline
                     fullWidth
                  />
                  <TextField
                     {...register("description[2].synopsis")}
                     label="Synopsis"
                     multiline
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
                  className="mt-4"
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
                  variant="outlined"
                  color="primary"
                  className="mt-4"
               >
                  Add EPUB Volume
               </Button>
            </div>
            <Button type="submit" variant="contained" color="primary">
               Add Novel
            </Button>
         </form>
      </Box>
   );
};

export default AddNovelForm;
