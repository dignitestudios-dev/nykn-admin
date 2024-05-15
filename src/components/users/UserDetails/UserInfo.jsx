import React, { useContext, useState } from "react";
import { GlobalContext } from "../../../context/GlobalContext";

const UserInfo = ({ user }) => {
  const { palette } = useContext(GlobalContext);
  return (
    <div className="w-full bg-white border border-[#eaeaea] shadow h-auto flex justify-start items-center p-3 rounded-full gap-3 ">
      <span
        className="rounded-full w-16 h-16 p-1 flex justify-center items-center"
        style={{
          background: palette?.brand,
        }}
      >
        <img
          className="h-full w-full rounded-full"
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7GhCyNdACcNjy7_Y2r7CP6bxSXo2yM0yEfQ&usqp=CAU"
          }
          alt=""
        />
      </span>

      <div className="w-auto flex flex-col justify-start items-start">
        <h1
          className="text-xl  font-extrabold "
          style={{
            color: palette?.color,
          }}
        >
          {user?.full_name}
        </h1>
        <span className="text-[#9b9c9b] text-wrap text-sm font-medium">
          {user?.email}
        </span>
      </div>
    </div>
  );
};

export default UserInfo;
