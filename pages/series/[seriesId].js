import axios from 'axios';

export default function SeriesPage({ book }) {
  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{book.name}</h1>
      <p>{book.href}</p>
      {/* Add more book details as needed */}
    </div>
  );
}

export async function getStaticPaths() {
  try {
    const response = await axios.get('http://localhost:3000/api/book/getAll');
    const books = response.data;

    const paths = books.map((book) => ({
      params: { seriesId: book._id },
    }));

    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    console.error('Error fetching books:', error);
    return {
      paths: [],
      fallback: true,
    };
  }
}

export async function getStaticProps({ params }) {
  const { seriesId } = params;

  try {
    const response = await axios.get(`http://localhost:3000/api/book/getById/${seriesId}`);
    const book = response.data;

    return {
      props: {
        book,
      },
    };
  } catch (error) {
    console.error('Error fetching book:', error);

    return {
      props: {
        book: null,
      },
    };
  }
}
