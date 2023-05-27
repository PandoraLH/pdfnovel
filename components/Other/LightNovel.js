import React from "react";
import Image from "next/image";
import Link from "next/link";

const LightNovel = ({ id, image, title, description, volumn }) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div
      key={id}
      className="lightnovel-container flex items-start border-b-2 mb-3 pb-3"
    >
      <Link href="/" className="flex-shrink-0">
        <Image
          src={image || "https://via.placeholder.com/150x200"}
          alt="Image"
          width={150}
          height={200}
        />
      </Link>
      <div className="font-poppins ml-5 object-contain mr-5">
        <div className="cursor-pointer font-bold text-2xl lg:text-4xl text-blue-700 hover:opacity-60 transition-opacity duration-500 ease-in-out">
          {title}
        </div>
        <div className="text-lg lg:text-xl">
          {expanded ? description : `${description.substring(0, 200)}`}
          {description.length > 200 && (
            <button
              className="text-blue-600 hover:opacity-60 transition-opacity duration-200 ease-in-out"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "...see less" : "...see more"}
            </button>
          )}
        </div>
        <div className="text-gray-400">{volumn}</div>
      </div>
    </div>
  );
};

export default LightNovel;