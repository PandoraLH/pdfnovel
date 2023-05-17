import React from "react";
import MainLink from "components/Other/MainLink";
import SubLink from "components/Other/SubLink";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <div className="footer flex justify-center bg-[#1A4AB9]">
        <div className="footer-container flex flex-col justify-between mt-8 md:flex-row px-10">
          <div className="logo-container flex flex-col items-center pb-3 md:pb-6 pt-3">
            <span className="font-bold font-poppins text-4xl pb-3 md:pb-6 bg-gradient-to-r from-purple-500 to-[#ffda55] text-transparent bg-clip-text">
              PDF Novel
            </span>
            <div className="flex gap-6 text-3xl">
              <FaInstagram className="cursor-pointer hover:text-yellow-600" />
              <FaTwitter className="cursor-pointer hover:text-blue-600" />
              <FaLinkedin className="cursor-pointer hover:text-blue-600" />
              <FaYoutube className="cursor-pointer hover:text-red-600" />
            </div>
          </div>
          <div className="link-container flex flex-col  md:flex-row">
            <div className="px-10">
              <ul>
                <MainLink text="Links" />
                <SubLink text="Home" />
                <SubLink text="Series" />
                <SubLink text="Forums" />
              </ul>
            </div>
            <div className="px-10">
              <ul>
                <MainLink text="Information" />
                <SubLink text="About" />
                <SubLink text="How It Works" />
                <SubLink text="Frequently Asked Questions" />
                <SubLink text="Terms of Service" />
                <SubLink text="Privacy Policy" />
              </ul>
            </div>
            <div className="px-10">
              <ul>
                <MainLink text="Account" />
                <SubLink text="Edit Profile Data" />
                <SubLink text="Library" />
                <SubLink text="Change Password" />
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center text-center p-2 bg-gray-50">
        <h1 className=" text-gray-800 font-semibold">
          © 2022-2023 All rights reserved | Build with ❤ by{" "}
          <span className="hover:text-blue-600 font-semibold cursor-pointer">
            Pan{" "}
          </span>
        </h1>
      </div>
    </>
  );
}
