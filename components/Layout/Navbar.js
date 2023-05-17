import { useState, useEffect, React } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [screenWidth, setScreenWidth] = useState(0);
  const [targetReached, setTargetReached] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenWidth]);

  useEffect(() => {
    if (screenWidth <= 900) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, [screenWidth]);

  return (
    <header>
      <nav className="navbar flex justify-center items-center bg-main-bg-color h-20">
        <div
          className={`navbar-container flex ${targetReached ? "flex-col" : ""}`}
        >
          <Link
            className="flex gap-2 justify-center items-center md:mr-24 lg:pl-4 pl-0"
            href="/"
          >
            <Image src="/logo.png" alt="Logo" width={50} height={50} />
            <div className="text-lg font-poppins font-bold text-main-text-color">
              PDF Novel
            </div>
          </Link>
          <div className="flex items-center text-main-text-color font-inter Lg:gap-5 lg:text-base justify-center text-2xl">
            <div
              className={`flex text-center font-semibold lg:mr-48 
            ${
              targetReached
                ? "fixed bottom-0 bg-gradient-to-r bg-main-bg-color w-full justify-center"
                : "mr-4"
            }`}
            >
              <Link
                className="flex justify-center items-center h-14 md:h-20 w-28 text-2xl
                 hover:text-blue-300 bg-white bg-opacity-0 hover:bg-opacity-95 transition duration-500 ease-in-out"
                href="/Home"
              >
                Home
              </Link>

              <Link
                className="flex justify-center items-center h-14 md:h-20 w-28 text-2xl
                 hover:text-blue-300 bg-white bg-opacity-0 hover:bg-opacity-95 transition duration-500 ease-in-out"
                href="/series"
              >
                Series
              </Link>

              <Link
                className="flex justify-center items-center h-14 md:h-20 w-28 text-2xl
                hover:text-blue-300 bg-white bg-opacity-0 hover:bg-opacity-95 transition duration-500 ease-in-out"
                href="/Home"
              >
                Forums
              </Link>

              {targetReached && (
                <Link
                  className="flex justify-center items-center h-14 md:h-20 w-28 text-2xl
                hover:text-blue-300 bg-white bg-opacity-0 hover:bg-opacity-95 transition duration-500 ease-in-out"
                  href="/Home"
                >
                  Login
                </Link>
              )}
            </div>
            <Link
              className={`"flex bg-[#f4f4f8] text-blue-400 font-bold py-2 px-6 hover:bg-gray-50 active:drop-shadow-xl active:shadow-slate-200 text-lg 
              ${targetReached ? "hidden" : ""}`}
              href="Home"
            >
              Log in
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
