import "../styles/globals.css";
import Head from "next/head";
import { ThemeProvider } from "@mui/material";
import { theme } from "../utils/theme";

function MyApp({ Component, pageProps }) {
   return (
      <ThemeProvider theme={theme}>
         <Component {...pageProps} />
      </ThemeProvider>
   );
}

export default MyApp;
