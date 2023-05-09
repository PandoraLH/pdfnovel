import React from "react";
import { GiSpottedArrowhead } from "react-icons/gi";

const SubLink = ({ text }) => {
  return (
    <li className="flex items-center text-white my-8">
      <GiSpottedArrowhead className="text-xl mr-2" />
      <span className=" hover:text-blue-300 cursor-pointer font-inter font-semibold text-md">
        {" "}
        {text}{" "}
      </span>
    </li>
  );
};

export default SubLink;
