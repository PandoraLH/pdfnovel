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
    if (screenWidth <= 800) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, [screenWidth]);

  return (
    <header>
      <nav
        className={`navbar flex justify-center ${
          targetReached ? "h-32" : "h-24"
        }`}
        style={{ backgroundColor: "#0869FB" }}
      >
        <div
          className={`navbar-container flex ${
            targetReached ? "flex-col" : "p-8 justify-between"
          }`}
        >
          <style jsx>{`
            .navbar-container {
              width: 1152px;
            }
          `}</style>
          <Link
            className={`flex gap-2 justify-center items-center ${
              targetReached ? "" : "pl-4"
            }`}
            href="/"
          >
            <Image src="/logo.png" alt="Logo" width={50} height={50} />
            <div className="text-lg font-poppins font-bold text-white">
              PDF Novel
            </div>
          </Link>
          <div
            className={`flex items-center text-white font-inter ${
              targetReached ? "flex-col" : "gap-5"
            }`}
          >
            <div className={`flex gap-10 ${targetReached ? "my-1" : "mr-48"}`}>
              <Link className="font-semibold" href="/Home">
                Home
              </Link>
              <Link className="font-semibold" href="/Home">
                Series
              </Link>
              <Link className="font-semibold" href="/Home">
                Forums
              </Link>
            </div>
            <Link
              className="flex bg-white text-[#0869FB] font-bold py-2 px-6 hover:bg-gray-50 active:drop-shadow-xl active:shadow-slate-200"
              href="Home"
            >
              LOG IN
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
