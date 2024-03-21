import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import { MdKeyboardArrowDown } from "react-icons/md";

const CategoryCard = ({ category }) => {
  const { palette } = useContext(GlobalContext);
  return (
    <div className="w-full lg:w-[calc(50%-0.25rem)]   h-auto flex flex-col justify-start items-start gap-2">
      <div
        className="w-full  h-auto p-2  flex flex-col gap-6 justify-between items-start rounded-xl md:rounded-full  "
        style={{
          background: `${palette?.dark_contrast_background}`,
          color: palette?.dark_contrast_color,
        }}
      >
        <div className="w-full h-auto flex flex-col md:flex-row gap-3 md:gap-3 justify-between items-start md:items-center">
          <div className="flex justify-start items-center gap-2">
            <img
              className="h-10 w-10 rounded-full"
              src={`${category?.category_image}`}
              alt=""
            />

            <div className="w-auto flex flex-col justify-start items-start">
              <h1 className="text-sm  font-bold ">
                {category?.category_title}
              </h1>
              <span className="text-[#9b9c9b] text-wrap text-xs font-medium">
                {category?.category_description.slice(0, 50)}
              </span>
            </div>
          </div>

          <div className="w-full md:w-auto flex justify-start items-center gap-2">
            {category?.isPaid == false && (
              <button className="w-[49.5%] md:w-24 h-7 text-xs ml-auto font-medium rounded-full flex items-center justify-center bg-green-400 text-white">
                Make it Paid!
              </button>
            )}

            {category?.isPaid == true && (
              <button className="w-[49.5%] md:w-24 h-7 text-xs ml-auto font-medium rounded-full flex items-center justify-center bg-red-400 text-white">
                Make it Free!
              </button>
            )}
            <Link
              to={`/categories/${category?._id}`}
              className="w-[49.5%] md:w-24  h-7 text-xs ml-auto font-medium rounded-full flex items-center justify-center  text-white"
              style={{
                background: palette?.brand,
              }}
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
