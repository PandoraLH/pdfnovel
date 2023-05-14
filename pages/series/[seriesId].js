import { useRouter } from "next/router";
import { getBookById } from "../api/book/getById/[bookId]";

export async function getServerSideProps({ params }) {
   const { seriesId } = params;
   try {
      const res = await getBookById(seriesId);
      const book = res.data;

      return { props: { book } };
   } catch (error) {
      console.error(error);
      return { props: { book: null } };
   }
}

function SeriesPage({ book }) {
   const router = useRouter();
   if (router.isFallback) {
      return <div>Loading...</div>;
   }
   if (!book) {
      return <div>Book not found</div>;
   }

   return (
      <div>
         <h1>{book.name}</h1>
         <img src={book.imgSrc} alt={book.name} />
         <p>{book.description}</p>
         {/* Render other book information */}
      </div>
   );
}

export default SeriesPage;
