import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? title + " - PDF Novel" : "PDF Novel"}</title>
        <meta name="description" content="PDF Novel Website" />
        <link rel="icon" href="/logo.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="flex min-h flex-col justify-between">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
