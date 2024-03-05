import React, { useContext, useRef } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { IoIosLogOut } from "react-icons/io";
import NotificationMessage from "./NotificationMessage";

const NotificationModal = ({ isOpen, setIsOpen, notificationRef }) => {
  const { palette, profile } = useContext(GlobalContext);

  return (
    <div
      ref={notificationRef}
      className={`w-96 h-auto ${
        isOpen ? "flex" : "hidden"
      } fixed top-16 right-2 flex-col gap-2 text-wrap rounded-md  justify-start shadow items-start p-2 `}
      style={{
        background: palette?.dark_contrast_background,
        color: palette?.color,
      }}
    >
      <div class="w-full h-auto   p-2 ">
        <div class="flex items-center justify-between">
          <p
            tabindex="0"
            class="focus:outline-none text-2xl font-semibold leading-6 "
          >
            Notifications
          </p>
        </div>

        <div className="w-full h-auto max-h-96 overflow-y-auto flex flex-col gap-2 justify-start items-start mt-4">
          <NotificationMessage />
          <NotificationMessage />
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
