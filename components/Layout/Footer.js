import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

export default function Footer() {
   return (
      <>
         <div
            className="footer flex justify-center"
            style={{ backgroundColor: "#3A98B9" }}
         >
            <div className="footer-container flex md:flex-row flex-col justify-around items-start p-20">
               <style jsx>{`
                  .footer-container {
                     width: 1152px;
                  }
               `}</style>
               <div className="p-5 ">
                  <ul>
                     <p className="text-gray-800 font-bold text-3xl pb-6">
                        PDF<span className="text-blue-600">Novel</span>
                     </p>
                     <div className="flex gap-6 pb-5">
                        <FaInstagram className="text-2xl cursor-pointer hover:text-yellow-600" />
                        <FaTwitter className="text-2xl cursor-pointer hover:text-blue-600" />
                        <FaLinkedin className="text-2xl cursor-pointer hover:text-blue-600" />
                        <FaYoutube className="text-2xl cursor-pointer hover:text-red-600" />
                     </div>
                  </ul>
               </div>
               <div className="p-5">
                  <ul>
                     <p className="text-gray-800 font-bold text-2xl pb-4">
                        Links
                     </p>
                     <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                        Home
                     </li>
                     <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                        Series
                     </li>
                     <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                        Forums
                     </li>
                  </ul>
               </div>
               <div className="p-5">
                  <ul>
                     <p className="text-gray-800 font-bold text-2xl pb-4">
                        Information
                     </p>
                     <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                        About
                     </li>
                     <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                        How It Works
                     </li>
                     <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                     Frequently Asked Questions

                     </li>
                     <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                     Terms of Service

                     </li>
                     <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                     Privacy Policy
                     </li>
                  </ul>
               </div>
               <div className="p-5">
                  <ul>
                     <p className="text-gray-800 font-bold text-2xl pb-4">
                     Account

                     </p>
                     <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                     Edit Profile Data

                     </li>
                     <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                     Library
                     </li>
                     <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                     Change Password
                     </li>
                  </ul>
               </div>
            </div>
         </div>
         <div className="flex flex-col justify-center items-center text-center  p-5 bg-gray-50">
            <h1 className=" text-gray-800 font-semibold">
               © 2022-2023 All rights reserved | Build with ❤ by{" "}
               <span className="hover:text-blue-600 font-semibold cursor-pointer">
                  streamline{" "}
               </span>
            </h1>
         </div>
      </>
   );
}
