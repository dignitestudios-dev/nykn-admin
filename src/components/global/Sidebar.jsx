import React, { useState } from "react";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import SidebarLink from "./SidebarLink";
import { sidebarArr } from "../../routes/routes";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";

const Sidebar = () => {
  const navigate = useNavigate();
  const { palette, sidebarActive, theme, setTheme } = useContext(GlobalContext);
  const arr = [1];
  return (
    <div
      className={`${
        sidebarActive ? "w-12 lg:w-72" : "w-12 lg:w-12"
      }  transition-all duration-150 h-[calc(100vh)] py-2 pr-2 fixed top-0 left-0 shadow-lg`}
      style={{
        background: palette?.dark_contrast_background,
      }}
    >
      {sidebarActive ? (
        <button
          className="h-12 flex items-center justify-center w-full font-bold "
          style={{
            color: palette?.brand,
          }}
        >
          {/* <img src="/logo.svg" className="w-40" /> */}
          <h1 className="text-2xl">NYKN</h1>
        </button>
      ) : (
        <button
          onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
          className="flex h-12 items-center justify-center w-full font-bold "
          style={{
            color: palette?.brand,
          }}
        >
          {/* <img src="/rentalbay-icon.png" className="w-auto" /> */}
          <h1 className="text-xs">NYKN</h1>
        </button>
      )}

      {sidebarArr?.map((link, key) => {
        return (
          <SidebarLink
            active={sidebarActive}
            key={key}
            icon={link?.icon}
            title={link?.name}
            link={link?.url}
          />
        );
      })}

      <span
        onClick={() => {
          Cookies.remove("token");
          navigate("/login");
        }}
        className={`sidebar-link w-full h-10 rounded-r-full cursor-pointer flex items-center justify-start gap-3 ${
          sidebarActive
            ? "px-5 flex items-center justify-start"
            : "flex items-center justify-center px-0"
        }  `}
        style={{
          color: palette?.color,
        }}
      >
        <BiLogOut />
        <span
          className={` text-md font-medium ${
            sidebarActive ? "hidden lg:block" : "hidden"
          }`}
        >
          Logout
        </span>
      </span>
    </div>
  );
};

export default Sidebar;
