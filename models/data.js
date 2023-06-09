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

const userDataSchema = new Schema({
   name: { type: String, required: true },
   email: { type: String, required: true },
   password: { type: String, required: true },
   followedNovel: [{ type: Schema.Types.ObjectId, ref: "data" }],
});

const userGoogleDataSchema = new Schema({
   name: { type: String, required: true },
   email: { type: String, required: true },
   image: { type: String, required: true },
   followedNovel: [{ type: Schema.Types.ObjectId, ref: "data" }],
});

const userFacebookDataSchema = new Schema({
   name: { type: String, required: true },
   email: { type: String, required: true },
   image: { type: String, required: true },
   followedNovel: [{ type: Schema.Types.ObjectId, ref: "data" }],
});

const data = models.data || model("data", dataSchema);
const user =
   models.userCredentials ||
   model("userCredentials", userDataSchema, "userCredentials");
const userGoogle =
   models.userGoogle || model("userGoogle", userGoogleDataSchema, "userGoogle");
const userFacebook =
   models.userFacebook ||
   model("userFacebook", userFacebookDataSchema, "userFacebook");

export { data, user, userGoogle, userFacebook };
