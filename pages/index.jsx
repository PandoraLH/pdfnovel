import Layout from "@/Layout/Layout";

export default function Home() {
   return (
      <div>
         <h1 className="text-3xl text-blue-700"> Homepage</h1>
      </div>
   );
}

Home.getInitialProps = async () => {
  return {
    title: "Home", // Provide the title as a prop in getInitialProps
  };
};

