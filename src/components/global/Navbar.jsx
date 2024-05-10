import React, { useContext, useState, useEffect, useRef } from "react";
import { IoSearch, IoSearchOutline } from "react-icons/io5";
import { GlobalContext } from "../../context/GlobalContext";
import { Link } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { HiMenuAlt2 } from "react-icons/hi";
import { HiOutlineChevronDoubleLeft } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import UserBtnModal from "./UserBtnModal";
import NotificationModal from "./NotificationModal";
import { FaPlus } from "react-icons/fa";
import { GoPlus } from "react-icons/go";

const Navbar = ({ name }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const userBtnRef = useRef();

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef();

  const { palette, sidebarActive, setSidebarActive, profile } =
    useContext(GlobalContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isProfileOpen &&
        userBtnRef.current &&
        !userBtnRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
      if (
        isNotificationOpen &&
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isProfileOpen, isNotificationOpen]);

  return (
    <div
      className={`w-full h-14 z-50 ${
        sidebarActive ? "pl-2 pr-2" : "pl-2 pr-2"
      }  flex  z-50 justify-between  items-center gap-4 sticky top-0 left-0`}
      style={{
        background: palette?.dark_contrast_background,
      }}
    >
      <div className="w-auto relative flex justify-start items-center gap-2">
        <button
          className="block xl:hidden"
          onClick={() => setSidebarActive((prev) => !prev)}
          style={{
            color: palette?.color,
          }}
        >
          <HiMenuAlt2 className="text-2xl" />
        </button>
      </div>

      <div className="w-auto h-auto flex gap-3 justify-start items-center">
        <div className="flex justify-start items-center gap-2">
          <span
            style={{ background: palette?.brand }}
            onClick={(e) => {
              e.stopPropagation();
              setIsProfileOpen((prev) => !prev);
            }}
            className="w-8 h-8 cursor-pointer rounded-full p-0  flex items-stretch justify-stretch"
          >
            <img
              src="/profile.jpg"
              className="w-full h-full  object-cover rounded-full"
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
