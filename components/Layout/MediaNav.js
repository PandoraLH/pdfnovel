import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AiFillHome } from "react-icons/ai";
import { FiBookOpen } from "react-icons/fi";
import { BsFillChatFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
export default function MediaNav() {
   return (
      <>
         <header>
            <nav
               className="navbar h-14 "
               style={{ backgroundColor: "#62CDFF" }}
            >
               <div className="navbar-container flex justify-center">
                  <Link className="flex gap-2 items-center pl-4" href="/">
                     <Image src="/logo.png" alt="Logo" width={50} height={50} />
                     <div className="text-lg font-bold">PDF Novel</div>
                  </Link>
               </div>
            </nav>
         </header>
         <div
            className="MediaNav fixed bottom-0 left-0 right-0 flex justify-center "
            style={{ backgroundColor: "#62CDFF" }}
         >
            <div className="flex gap-5 items-center py-2">
               <Link
                  className="flex flex-col items-center justify-center"
                  href="/Home"
               >
                  <AiFillHome className="text-2xl" />
                  <div className="">Home</div>
               </Link>
               <Link
                  className="flex flex-col items-center justify-center"
                  href="Home"
               >
                  <FiBookOpen className="text-2xl" />
                  <div className="">Series</div>
               </Link>
               <Link
                  className="flex flex-col items-center justify-center"
                  href="Home"
               >
                  <BsFillChatFill className="text-2xl" />
                  <div className="">Forums</div>
               </Link>
               <Link
                  className="flex flex-col items-center justify-center"
                  href="Home"
               >
                  <FaUserAlt className="text-2xl" />
                  <div className="">Login</div>
               </Link>
            </div>
         </div>
      </>
   );
}
