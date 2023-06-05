import { Box, Typography, Button } from "@mui/material";
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
         "http://localhost:3000/api/novel/getAll"
      );
      const novels = response.data;

      const paths = novels.map((novel) => ({
         params: { seriesId: novel._id },
      }));

      return {
         paths,
         fallback: true,
      };
   } catch (error) {
      console.error("Error fetching novels:", error);
      return {
         paths: [],
         fallback: true,
      };
   }
}

export async function getStaticProps({ params }) {
   const { seriesId } = params;

   try {
      const response = await axios.get(
         `http://localhost:3000/api/novel/getById/${seriesId}`
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
