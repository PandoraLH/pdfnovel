import axios from "axios";

export default function SeriesPage({ novels }) {
   if (!novels) {
      return <p>Loading...</p>;
   }

   return (
      <div>
         <h1>All novels</h1>
         {novels.map((novel) => (
            <div key={novel._id}>
               <h2>{novel.name}</h2>
               <p>{novel.href}</p>
               {/* Add more novel details as needed */}
            </div>
         ))}
      </div>
   );
}

export async function getStaticProps() {
   try {
      const response = await axios.get(
         "http://localhost:3000/api/novel/getAll"
      );
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
