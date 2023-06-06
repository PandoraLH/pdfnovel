import { useState, useEffect, React } from "react";
import AccountMenu from "components/Other/AccountMenu";
import { CircularProgress } from "@mui/material";
import FacebookCircularProgress from "components/Other/FacebookCircularProgress";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Navbar() {
   const [screenWidth, setScreenWidth] = useState(0);
   const [targetReached, setTargetReached] = useState(false);
   const { data: session, status } = useSession();

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

   function UserSection({ loading, targetReached, session }) {
      const loginButtonClassName = targetReached
         ? "flex justify-center items-center w-28 hover:text-blue-300 bg-white bg-opacity-0 hover:bg-opacity-95 transition duration-500 ease-in-out"
         : "bg-[#f4f4f8] text-blue-400 font-bold py-2 px-6 hover:bg-gray-50 active:drop-shadow-xl active:shadow-slate-200 text-lg";

      if (loading) {
         return <FacebookCircularProgress />;
      } else if (session) {
         return (
            <div className="flex justify-center items-center w-28 ">
               <AccountMenu
                  username={session.user.name}
                  profilePic={session.user.image}
               />
            </div>
         );
      } else {
         return (
            <Link className={loginButtonClassName} href="/login">
               Login
            </Link>
         );
      }
   }

   return (
      <header>
         <nav className="navbar bg-main-bg-color h-20 px-14 ">
            <div
               className={`navbar-container flex  ${
                  targetReached ? "flex-col" : "justify-between px-2"
               }`}
            >
               <Link
                  className={`flex gap-2 items-center justify-center ${
                     targetReached ? " mt-3" : "mr-24"
                  }`}
                  href="/"
               >
                  <Image src="/logo.png" alt="Logo" width={50} height={50} />
                  <div className="text-lg font-poppins font-bold text-main-text-color">
                     PDF Novel
                  </div>
               </Link>
               <div className="flex items-center justify-center text-main-text-color font-inter Lg:gap-5 lg:text-base text-2xl z-10">
                  <div
                     className={`flex font-semibold lg:mr-48 text-2xl h-14 md:h-20 
            ${
               targetReached
                  ? "fixed bottom-0 bg-main-bg-color w-full justify-center"
                  : "mr-4"
            }`}
                  >
                     <Link
                        className="flex justify-center items-center w-28 
                 hover:text-rose-500 bg-white bg-opacity-0 hover:bg-opacity-95 transition duration-500 ease-in-out"
                        href="/"
                     >
                        Home
                     </Link>

                     <Link
                        className="flex justify-center items-center w-28 
                 hover:text-rose-500 bg-white bg-opacity-0 hover:bg-opacity-95 transition duration-500 ease-in-out"
                        href="/series"
                     >
                        Series
                     </Link>

                     <Link
                        className="flex justify-center items-center w-28 
                hover:text-rose-500 bg-white bg-opacity-0 hover:bg-opacity-95 transition duration-500 ease-in-out"
                        href="/404"
                     >
                        Forums
                     </Link>
                     {targetReached && (
                        <UserSection
                           loading={status === "loading"}
                           targetReached={targetReached}
                           session={session}
                        />
                     )}
                  </div>

                  {!targetReached && (
                     <UserSection
                        loading={status === "loading"}
                        targetReached={targetReached}
                        session={session}
                     />
                  )}
               </div>
            </div>
         </nav>
      </header>
   );
}
