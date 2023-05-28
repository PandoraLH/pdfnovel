import axios from "axios";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import LightNovel from "../../components/Other/LightNovel";
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

export default function SeriesPage({ novels }) {
  const [page, setPage] = useState(1);
  const totalNovels = novels.length;

  const isMediumScreen = useMediaQuery("(max-width: 768px)");
  const siblingCount = isMediumScreen ? 0 : 4;
  const boundaryCount = isMediumScreen ? 0 : 2;

  const handleChange = (event, value) => {
    setPage(value);
  };

  const currentNovels = novels.slice((page - 1) * 10, page * 10) || [];

  if (!novels) {
    return <p>Loading...</p>;
  }

  return (
    <div className="series bg-white">
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
              color="primary"
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
            <Pagination
              count={Math.ceil(totalNovels / 10)}
              color="primary"
              size="large"
              onChange={handleChange}
              showFirstButton
              showLastButton
              boundaryCount={boundaryCount}
              siblingCount={siblingCount}
            />
            <div className="lightnovel mt-4 mb-1">
              {currentNovels.map((novel) => (
                <LightNovel
                  key={novel._id}
                  image={novel.imgSrc}
                  title={novel.name}
                  description={novel.description[2].synopsis}
                  volumn={novel.href}
                />
              ))}
            </div>
            <Pagination
              count={Math.ceil(totalNovels / 10)}
              color="primary"
              size="large"
              onChange={handleChange}
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

export async function getStaticProps() {
  try {
    const response = await axios.get("http://localhost:3000/api/novel/getAll");
    const novels = response.data;

    return {
      props: {
        novels,
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
