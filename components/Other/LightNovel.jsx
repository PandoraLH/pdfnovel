import React, { memo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const LightNovel = ({
  id,
  image,
  title,
  description,
  otherNames,
  genres,
  author,
  status,
}) => {
  const [expandedDescription, setExpandedDescription] = useState(false);
  return (
    <div className="lightnovel-container flex items-center border-b-[5px] mb-3 pb-3">
      <Link href="/" className="flex-shrink-0 " key={id}>
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

        <div>
          <span className="font-bold">Other names</span>
          <span>: {otherNames.join(" • ")}</span>
        </div>

        <div>
          <span className="font-bold">Genres</span>
          <span>: {genres.join(" - ")}</span>
        </div>

        <div>
          <span className="font-bold">Author</span>
          <span>:</span>
          {author && status && (
            <span>
              <span> {author} — </span>
              <span
                className={`px-2 py-[1px] rounded  text-white
          ${
            status === "Completed"
              ? "bg-green-500"
              : status === "Ongoing"
              ? "bg-yellow-500"
              : "bg-red-500"
          }
          `}
              >
                {status}
              </span>
            </span>
          )}
        </div>

        <div className="text-lg lg:text-xl">
          {expandedDescription
            ? description
            : `${description.substring(0, 50)}`}
          {description.length > 50 && (
            <button
              className="text-blue-600 hover:opacity-60 "
              onClick={() => setExpandedDescription(!expandedDescription)}
            >
              {expandedDescription ? "...see less" : "...see more"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(LightNovel);
