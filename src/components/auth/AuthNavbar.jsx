import React from "react";
import { useContext } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";

const AuthNavbar = () => {
  const { palette, setTheme, theme } = useContext(GlobalContext);
  return (
    <div
      className="w-full h-14  px-6 lg:px-14 flex justify-between lg:justify-center items-center gap-4  sticky top-0 left-0"
      style={{
        background: palette?.dark_contrast_background,
        color: palette?.color,
      }}
    >
      <button onClick={() => setTheme(theme == "dark" ? "light" : "dark")}>
        {/* <img src="/logo.svg" className="w-40" /> */}
        <h1 className="text-2xl font-bold" style={{ color: palette?.brand }}>
          NYKN
        </h1>
      </button>
    </div>
  );
};

export default AuthNavbar;
