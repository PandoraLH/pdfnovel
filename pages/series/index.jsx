import axios from "axios";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import LightNovel from "components/Series/LightNovel";
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import {
  CircularProgress,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

export default function SeriesPage({ totalNovels, genres }) {
  const router = useRouter();
  const currentPage = +router.query.page || 1;
  const totalPage = Math.ceil(totalNovels / 10);

  const isMediumScreen = useMediaQuery("(max-width: 768px)");
  const siblingCount = isMediumScreen ? 0 : 4;
  const boundaryCount = isMediumScreen ? 0 : 2;

  const [novels, setNovels] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [selectedSortOption, setSelectedSortOption] = useState("A-Z");
  const [selectedGenre, setSelectedGenre] = useState("");

  const fetchNovels = async () => {
    try {
      const response = await axios.get(
        `/api/novel/getNovels?page=${currentPage}&search=${searchQuery}&sort=${sortOption}&genre=${selectedGenre}`
      );
      const novels = response.data;
      setNovels(novels);
    } catch (error) {
      console.error("Error fetching novels:", error);
    }
  };

  useEffect(() => {
    fetchNovels();
  }, [currentPage, searchQuery, sortOption, selectedGenre]);

  const changePage = async (event, value) => {
    await router.push(`/series?page=${value}`);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortOption = (option) => {
    setSelectedSortOption(option);
    setSortOption(option);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  if (!novels) {
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
    <div className="series bg-zinc-100">
      <div className="series-container w-full flex flex-col md:flex-row">
        <div className="md:w-1/5 md:block bg-slate-50">
          <div>
            <div className="flex justify-center text-2xl text-rose-500 font-semibold my-2">
              Sort By
            </div>
            <div className="flex flex-col border-gray-300 border-t-2 border-b-2">
              <div className="flex w-full border-gray-300 border-b-2">
                <Button
                  onClick={() => handleSortOption("A-Z")}
                  sx={{
                    borderRight: "2px solid #d1d5db",
                    borderRadius: 0,
                    width: "50%",
                    color: "black",
                  }}
                  className={`${
                    selectedSortOption === "A-Z" ? "bg-main-bg-color" : ""
                  }`}
                >
                  A-Z
                </Button>
                <Button
                  onClick={() => handleSortOption("Z-A")}
                  sx={{
                    borderRadius: 0,
                    width: "50%",
                    color: "black",
                  }}
                  className={`${
                    selectedSortOption === "Z-A" ? "bg-main-bg-color" : ""
                  }`}
                >
                  Z-A
                </Button>
              </div>
              <div className="flex w-full ">
                <Button
                  onClick={() => handleSortOption("Newest")}
                  sx={{
                    borderRight: "2px solid #d1d5db",
                    borderRadius: 0,
                    width: "50%",
                    color: "black",
                  }}
                  className={`${
                    selectedSortOption === "Newest" ? "bg-main-bg-color" : ""
                  }`}
                >
                  Newest
                </Button>
                <Button
                  onClick={() => handleSortOption("Oldest")}
                  sx={{
                    borderRadius: 0,
                    width: "50%",
                    color: "black",
                  }}
                  className={`${
                    selectedSortOption === "Oldest" ? "bg-main-bg-color" : ""
                  }`}
                >
                  Oldest
                </Button>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-center text-2xl text-rose-500 font-semibold my-2">
              Genres
            </div>
            <FormControl variant="outlined" className="w-full px-2 md:px-4">
              <InputLabel id="genre-select-label" className="px-2 md:px-4">
                Genre
              </InputLabel>
              <Select
                labelId="genre-select-label"
                id="genre-select"
                value={selectedGenre}
                onChange={handleGenreChange}
                label="Genre"
              >
                <MenuItem value="">All Genres</MenuItem>
                {genres.map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    {genre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="w-full h-full md:w-4/5 border-gray-300 border-l-2">
          <div className="pt-4 px-2 md:px-4">
            <TextField
              label="Search novel"
              variant="outlined"
              size="small"
              color="searchbar"
              className="w-full"
              value={searchQuery}
              onChange={handleSearch}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon className="cursor-pointer" />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="flex flex-col  mb-3">
            <div className="lightnovel mt-4 mb-1">
              {novels.map((novel) => (
                <LightNovel
                  key={novel._id}
                  id={novel._id}
                  image={novel.imgSrc}
                  title={novel.name}
                  description={novel.description}
                  otherNames={novel.otherNames}
                  genres={novel.genres}
                  author={novel.author}
                  status={novel.status}
                />
              ))}
            </div>
            <div className="flex justify-center pt-2">
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
    </div>
  );
}
export async function getServerSideProps() {
  let dev = process.env.NODE_ENV !== "production";
  let { NEXT_PROD_URL, NEXT_DEV_URL } = process.env;
  try {
    const [novelCountResponse, genresResponse] = await axios.all([
      axios.get(
        `${dev ? NEXT_DEV_URL : NEXT_PROD_URL}/api/novel/getTotalNovelCount`
      ),
      axios.get(`${dev ? NEXT_DEV_URL : NEXT_PROD_URL}/api/novel/getGenres`),
    ]);

    const totalNovels = novelCountResponse.data;
    const genres = genresResponse.data;

    return {
      props: {
        totalNovels,
        genres,
        title: "Series",
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        totalNovels: null,
        genres: null,
      },
    };
  }
}
