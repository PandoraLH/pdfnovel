import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
   {
      name: { type: String, required: true },
      href: { type: String },
      imgSrc: { type: String },
      description: [
         {
            panel: { type: String },
            description: { type: String },
            synopsis: { type: String },
         },
      ],
      pdfVolume: [
         {
            link: { type: String },
         },
      ],
      epubVolume: [
         {
            link: { type: String },
         },
      ],
   },
   {
      timestamps: true,
   }
);

const data = mongoose.models.data || mongoose.model("data", dataSchema);
export default data;
