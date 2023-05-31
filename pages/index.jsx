import Layout from "@/Layout/Layout";
import Image from "next/image";

export default function Home() {
   return (
      <div>
         <Image src="/cover.jpg" width={1152} height={150} />
      </div>
   );
}

Home.getInitialProps = async () => {
   return {
      title: "Home", // Provide the title as a prop in getInitialProps
   };
};
