import React from "react";
import { GiSpottedArrowhead } from "react-icons/gi";
import { useRouter } from "next/router";

const SubLink = ({ text, onClick }) => {
   const router = useRouter();

   return (
      <li className="flex items-center my-4 md:my-8" onClick={onClick}>
         <GiSpottedArrowhead className="text-xl mr-2" />
         <span className=" hover:text-blue-200 cursor-pointer font-inter font-semibold text-md">
            {" "}
            {text}
         </span>
      </li>
   );
};

export default SubLink;
