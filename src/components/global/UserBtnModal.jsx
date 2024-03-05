import React, { useContext, useRef } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { IoIosLogOut } from "react-icons/io";
import axios from "axios";

const UserBtnModal = ({ isOpen, setIsOpen, userBtnRef }) => {
  const navigate = useNavigate();
  const { palette, profile, baseUrl } = useContext(GlobalContext);

  const logout = () => {
    const token = Cookies.get("token");

    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": true,
      };
      axios.get(`${baseUrl}/logout`, { headers }).then(
        (response) => {
          setIsOpen(false);
          Cookies.remove("token");
          Cookies.remove("isLoggedIn");
          navigate("/login");
        },
        (error) => {
          if (error?.response?.status == 401) {
            setIsOpen(false);
            Cookies.remove("token");
            Cookies.remove("isLoggedIn");
            navigate("/login");
          } else {
            setIsOpen(false);
            Cookies.remove("token");
            Cookies.remove("isLoggedIn");
            navigate("/login");
          }
        }
      );
    }
  };

  return (
    <div
      ref={userBtnRef}
      className={`modal w-56 h-auto ${
        isOpen ? "flex" : "hidden"
      } fixed top-16 right-2 flex-col gap-2 text-wrap rounded-md  justify-start shadow-md items-start p-2 `}
      style={{
        background: palette?.dark_contrast_background,
        color: palette?.light_contrast_color,
      }}
    >
      <div class="h-auto w-full flex flex-col px-2 ">
        <span class="block text-sm font-bold ">{profile?.name}</span>
        <span class="block text-sm font-medium  ">{profile?.email}</span>
      </div>
      <button
        onClick={logout}
        style={{
          borderTop: `1px solid ${palette?.brand}`,
        }}
        className="h-8 w-full font-medium  flex items-center justify-start gap-1 px-2 hover:opacity-85"
      >
        <IoIosLogOut className="text-md font-medium mt-1" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default UserBtnModal;
