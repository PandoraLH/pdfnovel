import db from "@/utils/db";
import { data } from "@/models/data";

export default async function getNovels(req, res) {
  if (req.method === "GET") {
    try {
      const currentPage = req.query.page;
      await db.connect();
      const novels = await data
        .find(
          {},
          {
            name: 1,
            imgSrc: 1,
            description: 1,
            genre: 1,
            otherName: 1,
            author: 1,
            status: 1,
          }
        )
        .lean()
        .skip((currentPage - 1) * 10)
        .limit(10);
      const mappedNovels = novels.map((novel) => {
        const { _id, name, imgSrc, author, status } = novel;
        const description =
          novel.description[novel.description.length - 1].synopsis;
        const otherNames = novel.otherName.map((name) => name.name);
        const genres = novel.genre.map((genre) => genre.name);

        return {
          _id,
          name,
          imgSrc,
          author,
          status,
          description,
          otherNames,
          genres,
        };
      });
      res.status(200).json(mappedNovels);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving Novels" });
    } finally {
      await db.disconnect();
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
