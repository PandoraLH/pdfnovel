import axios from "axios";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import LightNovel from "../../components/Other/LightNovel";
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

export default function SeriesPage({ books }) {
  const [page, setPage] = useState(1);
  const totalNovels = books.length;

  const isMediumScreen = useMediaQuery("(max-width: 768px)");
  const siblingCount = isMediumScreen ? 0 : 5;
  const boundaryCount = isMediumScreen ? 0 : 1;

  const handleChange = (event, value) => {
    setPage(value);
  };

  const currentNovels = books.slice((page - 1) * 10, page * 10) || [];

  if (!books) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="series-container flex">
        <div className="h-full w-[20%]">
          <div>Sort</div>
        </div>
        <div className="h-full w-[80%] mt-3">
          <div className="mb-3">
            <TextField
              label="Search novel"
              variant="outlined"
              size="small"
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
              {currentNovels.map((book) => (
                <LightNovel
                  key={book._id}
                  image={book.imgSrc}
                  title={book.name}
                  description={book.description[2].synopsis}
                  volumn={book.href}
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
    const response = await axios.get("http://localhost:3000/api/book/getAll");
    const books = response.data;

    return {
      props: {
        books,
      },
    };
  } catch (error) {
    console.error("Error fetching books:", error);

    return {
      props: {
        books: null,
      },
    };
  }
}
