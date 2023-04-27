import React from "react";

const SubLink = ({ text }) => {
  return (
    <li className="flex items-center text-white text-md font-inter font-semibold hover:text-blue-300 cursor-pointer my-8">
      <svg
        width="18"
        height="20"
        viewBox="0 0 18 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mr-3"
      >
        <path
          d="M6.375 4.25L11.625 9.5L6.375 14.75"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      {text}
    </li>
  );
};

export default SubLink;
