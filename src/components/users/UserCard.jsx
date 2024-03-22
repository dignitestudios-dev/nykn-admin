import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import axios from "axios";
import Cookies from "js-cookie";
import BtnLoader from "../global/BtnLoader";
import { Link } from "react-router-dom";

const UserCard = ({ user, setReload }) => {
  const { palette, baseUrl, theme } = useContext(GlobalContext);

  const [loading, setLoading] = useState(false);

  // const blockOrUnblockUser = () => {
  //   const token = Cookies.get("token");

  //   if (token) {
  //     setLoading(true);
  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //       "ngrok-skip-browser-warning": true,
  //     };
  //     axios.get(`${baseUrl}/admin/users/${user?.id}/block`, { headers }).then(
  //       (response) => {
  //         setReload((prev) => !prev);
  //         setLoading(false);
  //         console.log(response);
  //       },
  //       (error) => {
  //         if (error?.response?.status == 401) {
  //           Cookies.remove("token");
  //           Cookies.remove("isLoggedIn");
  //           navigate("/login");
  //         }
  //         setLoading(false);
  //         console.log(error);
  //       }
  //     );
  //   }
  // };
  return (
    <div
      className="w-full md:w-[49%] lg:w-[32.5%] xl:w-[24.5%]  h-auto p-2 md:p-4 flex flex-col gap-6 justify-between items-start rounded-2xl "
      style={{
        background: `${palette?.dark_contrast_background}`,
        color: palette?.dark_contrast_color,
      }}
    >
      <div className="w-full h-auto flex gap-1 md:gap-3 justify-start items-center">
        <img
          className="h-10 w-10 rounded-md"
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7GhCyNdACcNjy7_Y2r7CP6bxSXo2yM0yEfQ&usqp=CAU"
          }
          alt=""
        />

        <div className="w-auto flex flex-col justify-start items-start">
          <h1 className="text-sm xl:text-lg font-bold ">{user?.full_name}</h1>
          <span className="text-[#9b9c9b] text-xs md:text-sm xl:text-sm font-medium">
            {user?.email}
          </span>
        </div>
      </div>

      <div className="w-full h-auto flex flex-row justify-end items-center gap-2">
        <div className="w-full h-auto flex justify-start items-center gap-2">
          <Link
            to={`/users/${user?.id}`}
            className={`  text-white text-sm w-full h-8 rounded-full transition-all duration-200 hover:opacity-90 font-medium  flex items-center justify-center`}
            style={{
              background: palette?.brand,
            }}
          >
            View More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
