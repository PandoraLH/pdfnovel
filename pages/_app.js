import "../styles/globals.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "../utils/theme";
import Layout from "@/Layout/Layout";
import ToasterProvider from "providers/ToasterProvider";

function MyApp({ Component, pageProps }) {
   const pageTitle = pageProps.title || ""; // Default empty string if no title is provided

   return (
      <div className="flex items-center justify-center">
         <div className="w-[1152px] border-l border-r border-gray-300">
            <ThemeProvider theme={theme}>
               <Layout title={pageTitle}>
                  <ToasterProvider />
                  <Component {...pageProps} title={pageTitle} />
               </Layout>
            </ThemeProvider>
         </div>
      </div>
   );
}

export default MyApp;
