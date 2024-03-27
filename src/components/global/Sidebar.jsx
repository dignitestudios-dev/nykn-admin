import React, { useState } from "react";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import SidebarLink from "./SidebarLink";
import { sidebarArr } from "../../routes/routes";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { HiMenuAlt2 } from "react-icons/hi";

const Sidebar = () => {
  const navigate = useNavigate();
  const { palette, sidebarActive, theme, setTheme, setSidebarActive } =
    useContext(GlobalContext);
  const arr = [1];
  return (
    <div
      className={`${
        sidebarActive ? "translate-x-0" : "-translate-x-full xl:translate-x-0"
      }  transition-all duration-150 h-[calc(100vh)] z-[1000] py-2 pr-2 w-72 flex flex-col gap-2 justify-start items-start fixed top-0 left-0  shadow-lg xl:shadow-none`}
      style={{
        background: palette?.dark_contrast_background,
      }}
    >
      <button
        className="block xl:hidden absolute top-4 left-2"
        onClick={() => setSidebarActive((prev) => !prev)}
        style={{
          color: palette?.color,
        }}
      >
        <HiMenuAlt2 className="text-2xl" />
      </button>
      <button
        className="h-12 flex items-center justify-center w-full font-bold "
        style={{
          color: palette?.brand,
        }}
      >
        {/* <img src="/logo.svg" className="w-40" /> */}
        <h1 className="text-2xl">NYKN</h1>
      </button>
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
        className={`sidebar-link w-full h-10 rounded-r-full cursor-pointer gap-3 
            px-5 flex items-center justify-start
         `}
        style={{
          color: palette?.color,
        }}
      >
        <BiLogOut />
        <span className={` text-md font-medium `}>Logout</span>
      </span>
    </div>
  );
};

export default Sidebar;
