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
      author: { type: String },
      illustrator: { type: String },
      genre: [
         {
            name: { type: String },
         },
      ],
      otherName: [
         {
            name: { type: String },
         },
      ],
      status: { type: String },
      pdfVolume: [
         {
            name: { type: String },
            link: { type: String },
         },
      ],
      epubVolume: [
         {
            name: { type: String },
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
