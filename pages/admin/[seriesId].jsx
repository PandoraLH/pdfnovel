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

export async function getServerSideProps({ params }) {
   const { seriesId } = params;
   try {
      await db.connect();
      const novelDoc = await data.findById(seriesId);
      const novel = JSON.parse(JSON.stringify(novelDoc));
      return {
         props: {
            novel,
         },
      };
   } catch (error) {
      console.error("Error fetching novel:", error);

      return {
         props: {
            novel: null,
         },
      };
   } finally {
      await db.disconnect();
   }
}
