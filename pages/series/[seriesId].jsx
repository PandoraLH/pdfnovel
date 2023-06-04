import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import Information from "components/SeriesDetails/Information/Information";
import Content from "components/SeriesDetails/Content";
import { AiFillHome } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";

export default function SeriesPage({ novel }) {
  const router = useRouter();

  useEffect(() => {
    if (!novel) {
      router.push("/404"); // Redirect to a 404 page if novel data is not available
    }
  }, [novel, router]);

  if (!novel) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="w-full">
      <Box className="bg-slate-200">
        <Box className="py-5">
          <Button className="bg-zinc-100 flex flex-row items-center gap-2 px-3 rounded-md shadow-md">
            <IoIosArrowBack size={26} className="text-black" />
            <Box className="flex flex-row items-center gap-1">
              <Typography className="text-lg text-black"> Home</Typography>
              <AiFillHome size={16} className="text-black" />
            </Box>
          </Button>
        </Box>
        <Box className="flex md:gap-4 lg:gap-8 xl:gap-10 ">
          <Box className="w-full md:w-4/5 ">
            <Content novel={novel} />
          </Box>
          <Box className="hidden md:block w-1/4 ">
            <Box className="mr-3 bg-zinc-100 rounded-xl border border-gray-400 shadow-xl">
              <Information novel={novel} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export async function getStaticPaths() {
  try {
    const response = await axios.get("/api/novel/getAll");
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
