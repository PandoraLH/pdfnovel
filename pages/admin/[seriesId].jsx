import { Box } from "@mui/material";
import UpdateNovel from "components/Admin/UpdateNovel";
import db from "@/utils/db";
import { data } from "@/models/data";

export default function AdminSeries({ novel }) {
   return (
      <Box>
         <UpdateNovel novel={novel} />
      </Box>
   );
}

export async function getStaticPaths() {
   try {
      await db.connect();
      const novels = await data.find({}).select("_id");
      const novelIds = novels.map((novel) => novel._id.toString());
      const paths = novelIds.map((novelId) => ({
         params: { seriesId: novelId },
      }));
      return {
         paths,
         fallback: "blocking",
      };
   } catch (error) {
      console.error("Error fetching novels:", error);
      return {
         paths: [],
         fallback: "blocking",
      };
   } finally {
      await db.disconnect();
   }
}

export async function getStaticProps({ params }) {
   const { seriesId } = params;
   try {
      await db.connect();
      const novelDoc = await data.findById(seriesId);
      const novel = JSON.parse(JSON.stringify(novelDoc));
      return {
         props: {
            novel,
         },
         revalidate: 60, // Set the revalidation time in seconds
      };
   } catch (error) {
      console.error("Error fetching novel:", error);

      return {
         props: {
            novel: null,
         },
         revalidate: 60,
      };
   } finally {
      await db.disconnect();
   }
}
