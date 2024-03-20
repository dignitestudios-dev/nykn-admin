import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import { MdKeyboardArrowDown } from "react-icons/md";

const CategorySkeleton = () => {
  const { palette } = useContext(GlobalContext);
  return (
    <div className="w-full lg:w-[calc(50%-0.25rem)]   h-auto flex flex-col justify-start items-start gap-2">
      <div
        className="w-full  h-auto p-2  flex flex-col gap-6 justify-between items-start rounded-xl md:rounded-full  "
        style={{
          background: `${palette?.light_contrast_background}`,
          color: palette?.dark_contrast_color,
        }}
      >
        <div className="w-full h-auto flex flex-col md:flex-row gap-3 md:gap-3 justify-between items-start md:items-center">
          <div className="flex justify-start items-center gap-2">
            <span
              className="w-8 h-8 rounded-full animate-pulse"
              style={{ backgroundColor: palette.dark_contrast_background }}
            ></span>

            <div className="w-auto flex flex-col justify-start items-start">
              <span
                className="w-[60%] h-1 rounded-full animate-pulse"
                style={{ backgroundColor: palette.dark_contrast_background }}
              ></span>
              <span
                className="w-[80%] h-[2px] rounded-full animate-pulse"
                style={{ backgroundColor: palette.dark_contrast_background }}
              ></span>
            </div>
          </div>

          <div className="w-full md:w-auto flex justify-start items-center gap-2">
            <button
              className="w-[49.5%] animate-pulse md:w-24 h-7 text-xs ml-auto font-medium rounded-full flex items-center justify-center  text-white"
              style={{ background: palette?.dark_contrast_background }}
            ></button>

            <button
              className="w-[49.5%] animate-pulse md:w-24  h-7 text-xs ml-auto font-medium rounded-full flex items-center justify-center  text-white"
              style={{
                background: palette?.dark_contrast_background,
              }}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySkeleton;
