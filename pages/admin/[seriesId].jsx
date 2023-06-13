import { Box } from "@mui/material";
import axios from "axios";
import UpdateNovel from "components/Admin/UpdateNovel";

export default function AdminSeries({ novel }) {
   return (
      <Box>
         <UpdateNovel novel={novel} />
      </Box>
   );
}

export async function getStaticPaths() {
   try {
      const response = await axios.get(
         `${process.env.NEXT_PUBLIC_BASE_URL}/api/novel/getIdAll`
      );
      const novelIds = response.data;

      const paths = novelIds.map((novelId) => ({
         params: { seriesId: novelId },
      }));

      return {
         paths,
         fallback: false,
      };
   } catch (error) {
      console.error("Error fetching novels:", error);
      return {
         paths: [],
         fallback: false,
      };
   }
}

export async function getStaticProps({ params }) {
   const { seriesId } = params;

   try {
      const response = await axios.get(
         `${process.env.NEXT_PUBLIC_BASE_URL}/api/novel/getById/${seriesId}`
      );
      const novel = response.data;

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
   }
}
