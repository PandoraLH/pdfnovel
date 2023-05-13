import data from "models/data";
import fetchNovels from "utils/scrape";
import db from "utils/db";

const handler = async (req, res) => {
   await db.connect();
   await data.deleteMany();
   const items = await fetchNovels();
   await data.insertMany(items);
   await db.disconnect();
   res.send({ message: "seeded suscessfully" });
};

export default handler;
