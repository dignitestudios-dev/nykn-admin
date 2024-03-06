import React, { useContext, useState, useEffect, useRef } from "react";
import { IoSearch, IoSearchOutline } from "react-icons/io5";
import { GlobalContext } from "../../context/GlobalContext";
import { Link } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { HiMenuAlt2 } from "react-icons/hi";
import { HiOutlineChevronDoubleLeft } from "react-icons/hi";
import UserBtnModal from "./UserBtnModal";
import NotificationModal from "./NotificationModal";

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
      className={`w-full h-14 ${
        sidebarActive ? "pl-2 pr-2" : "pl-2 pr-2"
      }  flex  z-50 justify-between  items-center gap-4 sticky top-0 left-0`}
      style={{
        background: palette?.dark_contrast_background,
        boxShadow: `${palette?.dark_contrast_background} 1.95px 1.95px 2.6px`,
      }}
    >
      <div className="w-auto relative flex justify-start items-center gap-2">
        <button
          className="hidden lg:block"
          onClick={() => setSidebarActive((prev) => !prev)}
          style={{
            color: palette?.color,
          }}
        >
          {sidebarActive ? (
            <HiOutlineChevronDoubleLeft className="text-2xl" />
          ) : (
            <HiMenuAlt2 className="text-2xl" />
          )}
        </button>
        {/* <input
          type="text"
          className="w-40 md:w-52 h-10 rounded-full outline-none border-none px-4 text-sm"
          placeholder="Search"
          style={{
            background: palette?.background,
            color: palette?.color,
          }}
        />
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center absolute top-1 right-1 "
          style={{ background: palette?.brand, color: palette?.color }}
        >
          <IoSearch className="text-white" />
        </button> */}

        <h1
          className="text-lg md:text-xl font-bold"
          style={{
            color: palette?.color,
          }}
        >
          {name}
        </h1>
      </div>

      <div className="w-auto h-auto flex gap-3 justify-start items-center">
        <span
          onClick={(e) => {
            e.stopPropagation();
            setIsNotificationOpen((prev) => !prev);
          }}
          className="cursor-pointer"
        >
          <IoNotificationsOutline
            className="text-xl"
            style={{ color: palette?.light_contrast_color }}
          />
        </span>

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

          <UserBtnModal
            isOpen={isProfileOpen}
            setIsOpen={setIsProfileOpen}
            userBtnRef={userBtnRef}
          />
          <NotificationModal
            notificationRef={notificationRef}
            isOpen={isNotificationOpen}
            setIsOpen={setIsNotificationOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
