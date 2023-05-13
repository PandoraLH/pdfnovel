import React from "react";
import Image from "next/image";
import Link from "next/link";

const LightNovel = ({ title, description, volumn }) => {
  return (
    <div className="lightnovel-container flex flex-row items-start border-b-2">
      <Link href="/">
        <Image src="/logo.png" alt="Logo" width={200} height={200} />
      </Link>
      <div className="font-poppins ml-5">
        <div className="cursor-pointer font-bold text-2xl lg:text-4xl text-blue-700 hover:opacity-60 transition-opacity duration-500 ease-in-out">
          {title}
        </div>
        <div className="text-lg lg:text-2xl">{description}</div>
        <div className="text-gray-400">{volumn}</div>
      </div>
    </div>
  );
};

export default LightNovel;
