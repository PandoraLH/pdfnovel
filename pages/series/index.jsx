import axios from "axios";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import LightNovel from "components/Other/LightNovel";
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";

export default function SeriesPage({ totalNovels }) {
  const router = useRouter();
  const currentPage = +router.query.page || 1;
  const totalPage = Math.ceil(totalNovels / 10);

  const isMediumScreen = useMediaQuery("(max-width: 768px)");
  const siblingCount = isMediumScreen ? 0 : 4;
  const boundaryCount = isMediumScreen ? 0 : 2;

  const [novels, setNovels] = useState(null);

  const fetchNovels = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/novel/getNovels?page=${currentPage}`
      );
      const novels = response.data;
      setNovels(novels);
    } catch (error) {
      console.error("Error fetching novels:", error);
    }
  };

  useEffect(() => {
    fetchNovels();
  }, [currentPage]);

  const changePage = async (event, value) => {
    await router.push(`/series?page=${value}`);
  };

  if (!novels) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)] bg-zinc-100">
        <CircularProgress size={100} color="primary" />
      </div>
    );
  }

  return (
    <div className="series bg-zinc-100">
      <div className="series-container flex">
        <div className="lg:mr-[247px] lg:block hidden">
          <div>Sort</div>
        </div>
        <div className="h-full w-full mt-3">
          <div className="mb-3">
            <TextField
              label="Search novel"
              variant="outlined"
              size="small"
              color="searchbar"
              className="w-full"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon className="cursor-pointer" />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="flex flex-col items-center mb-3">
            <div className="lightnovel mt-4 mb-1">
              {novels.map((novel, index) => (
                <LightNovel
                  key={novel._id}
                  image={novel.imgSrc}
                  title={novel.name}
                  description={novel.description}
                  otherNames={novel.otherNames}
                  genres={novel.genres}
                  author={novel.author}
                  status={novel.status}
                  bottomBorder={index !== novels.length - 1}
                />
              ))}
            </div>
            <Pagination
              count={totalPage}
              color="primary"
              page={currentPage}
              size="large"
              onChange={changePage}
              showFirstButton
              showLastButton
              boundaryCount={boundaryCount}
              siblingCount={siblingCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/novel/getTotalNovelCount"
    );
    const totalNovels = response.data;
    return {
      props: {
        totalNovels,
      },
    };
  } catch (error) {
    console.error("Error fetching novels:", error);
    return {
      props: {
        novels: null,
      },
    };
  }
}
