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
      <div className="w-full border-gray-300 border-b-2">
         <div className="lightnovel-container flex justify-start items-center p-4">
            <Image
               src={image || "https://via.placeholder.com/150x200"}
               alt="Image"
               width={150}
               height={200}
               href={`/series/${id}`}
               className="border-[2px] border-white shadow-xl rounded-sm cursor-pointer"
            />
            <div className="font-poppins ml-5 object-contain mr-5">
               <Link
                  href={`/series/${id}`}
                  className="cursor-pointer font-bold text-xl lg:text-3xl text-rose-500 hover:opacity-60 transition-opacity duration-500 ease-in-out"
               >
                  {title}
               </Link>

               <div className="text-sm md:text-base">
                  <span className="font-bold">Other names</span>
                  <span>: {otherNames.join(" • ")}</span>
               </div>

               <div className="text-sm md:text-base">
                  <span className="font-bold">Genres</span>
                  <span>: {genres.join(" - ")}</span>
               </div>

               <div className="text-sm md:text-base">
                  <span className="font-bold">Author</span>
                  <span>:</span>
                  {author && status && (
                     <span>
                        <span> {author} — </span>
                        <span
                           className={`px-2 py-[1px] rounded  text-white text-sm md:text-base
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

               <div className="text-xs lg:text-base">
                  {expandedDescription
                     ? description
                     : `${description.substring(0, 50)}`}
                  {description.length > 50 && (
                     <button
                        className="text-rose-500 hover:opacity-60 "
                        onClick={() =>
                           setExpandedDescription(!expandedDescription)
                        }
                     >
                        {expandedDescription ? "...see less" : "...see more"}
                     </button>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default LightNovel;
