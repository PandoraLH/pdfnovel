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
        <div className="footer-container flex md:flex-row flex-col justify-around items-start my-8 w-[1152px">
          <div className="p-3">
            <ul>
              <p className="text-gray-800 font-bold text-3xl pb-6">
                PDF<span className="text-red-600">Novel</span>
              </p>
              <div className="flex gap-6 pb-5">
                <FaInstagram className="text-2xl cursor-pointer hover:text-yellow-600" />
                <FaTwitter className="text-2xl cursor-pointer hover:text-blue-600" />
                <FaLinkedin className="text-2xl cursor-pointer hover:text-blue-600" />
                <FaYoutube className="text-2xl cursor-pointer hover:text-red-600" />
              </div>
            </ul>
          </div>
          <div className="p-3">
            <ul>
              <MainLink text="Links" />
              <SubLink text="Home" />
              <SubLink text="Series" />
              <SubLink text="Forums" />
            </ul>
          </div>
          <div className="p-3">
            <ul>
              <MainLink text="Information" />
              <SubLink text="About" />
              <SubLink text="How It Works" />
              <SubLink text="Frequently Asked Questions" />
              <SubLink text="Terms of Service" />
              <SubLink text="Privacy Policy" />
            </ul>
          </div>
          <div className="p-3">
            <ul>
              <MainLink text="Account" />
              <SubLink text="Edit Profile Data" />
              <SubLink text="Library" />
              <SubLink text="Change Password" />
            </ul>
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
