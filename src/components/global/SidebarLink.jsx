import React, { useEffect } from "react";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";

const SidebarLink = ({ icon, title, link, active }) => {
  const navigate = useNavigate();
  const { palette, activeLink, setActiveLink } = useContext(GlobalContext);

  const navigateToLink = (title, link) => {
    navigate(link);
    setActiveLink(title);
  };

  return (
    <span
      style={{
        color: palette?.color,
      }}
      onClick={() => navigateToLink(title, link)}
      className={`sidebar-link ${
        activeLink == title && "bg-[#407BA7] text-white"
      } w-full h-10 rounded-r-full cursor-pointer flex items-center justify-start gap-3 ${
        active
          ? "px-5 flex items-center justify-start"
          : "flex items-center justify-center px-0"
      }  `}
    >
      {icon}
      <span
        className={` text-md font-medium ${
          active ? "hidden lg:block" : "hidden"
        }`}
      >
        {title}
      </span>
    </span>
  );
};

export default SidebarLink;
