import axios from "axios";
import LightNovel from "../../components/Other/LightNovel";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function SeriesPage({ books }) {
  if (!books) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="series-container flex">
        <div className="h-full w-[20%]">
          <div>Sort</div>
        </div>
        <div className="h-full w-[80%]">
          <div>Search bar</div>
          <Stack spacing={2}>
            <Pagination count={10} color="primary" />
          </Stack>
          <div className="lightnovel">
            <LightNovel
              title="Title"
              description="Description"
              volumn="Volumn"
            />
            <LightNovel
              title="Title"
              description="Description"
              volumn="Volumn"
            />
            <LightNovel
              title="Title"
              description="Description"
              volumn="Volumn"
            />
          </div>
          <div>Pagination</div>
        </div>
      </div>
      <h1>All Books</h1>

      {books.map((book) => (
        <div key={book._id}>
          <h2>{book.name}</h2>
          <p>{book.href}</p>
          {/* Add more book details as needed */}
        </div>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  try {
    const response = await axios.get("http://localhost:3000/api/book/getNovel");
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
