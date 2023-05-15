import axios from "axios";

export default function SeriesPage({ books }) {
   if (!books) {
      return <p>Loading...</p>;
   }

   return (
      <div>
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
