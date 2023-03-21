import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function MainNav() {
   return (
      <header>
         <nav
            className="navbar flex h-14 justify-center"
            style={{ backgroundColor: "#62CDFF" }}
         >
            <div className="navbar-container flex justify-between">
               <style jsx>{`
                  .navbar-container {
                     width: 1152px;
                  }
               `}</style>
               <Link className="flex gap-2 items-center pl-4" href="/">
                  <Image src="/logo.png" alt="Logo" width={50} height={50} />
                  <div className="text-lg font-bold">PDF Novel</div>
               </Link>
               <div className="flex gap-5 items-center">
                  <Link className="" href="/Home">
                     Home
                  </Link>
                  <Link className="flex" href="Home">
                     Series
                  </Link>
                  <Link className="flex" href="Home">
                     Forums
                  </Link>
                  <Link className="flex" href="Home">
                     LOG IN
                  </Link>
               </div>
            </div>
         </nav>
      </header>
   );
}
