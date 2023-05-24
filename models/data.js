import { Schema, models, model } from "mongoose";

const dataSchema = new Schema(
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

const userDataSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const data = models.data || model("data", dataSchema);
const user = models.user || model("user", userDataSchema);

export { data, user };
