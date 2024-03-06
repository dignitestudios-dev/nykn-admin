import React, { useContext } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import { Link } from "react-router-dom";

const UserCategoryCard = ({ category }) => {
  const { palette } = useContext(GlobalContext);
  return (
    <div
      className="w-full md:w-[49%] lg:w-[32.5%] xl:w-[24.5%]  h-auto p-2  flex flex-col gap-6 justify-between items-start rounded-full "
      style={{
        background: `${palette?.dark_contrast_background}`,
        color: palette?.dark_contrast_color,
      }}
    >
      <div className="w-full h-auto flex gap-1 md:gap-3 justify-start items-center">
        <img className="h-10 w-10 rounded-full" src={category?.image} alt="" />

        <div className="w-auto flex flex-col justify-start items-start">
          <h1 className="text-sm  font-bold ">{category?.name}</h1>
          <span className="text-[#9b9c9b] text-wrap text-xs font-medium">
            {category?.description}
          </span>
        </div>

        {category?.isPaid && (
          <span className="w-16 h-7 text-xs ml-auto font-medium rounded-full flex items-center justify-center bg-blue-400 text-white">
            Paid
          </span>
        )}

        {!category?.isUnlocked && (
          <button className="w-16 h-7 text-xs ml-auto font-medium rounded-full flex items-center justify-center bg-green-400 text-white">
            Unlock
          </button>
        )}

        {category?.isUnlocked && !category?.isPaid && (
          <button className="w-16 h-7 text-xs ml-auto font-medium rounded-full flex items-center justify-center bg-gray-700 text-white">
            Lock
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCategoryCard;
