import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { IoIosNotifications } from "react-icons/io";

const NotificationMessage = () => {
  const { palette } = useContext(GlobalContext);
  return (
    <div
      class="w-full p-3  rounded flex"
      style={{
        background: palette?.light_contrast_background,
        color: palette?.light_contrast_color,
      }}
    >
      <div
        tabindex="0"
        aria-label="heart icon"
        role="img"
        style={{
          border: `2px solid ${palette?.light_contrast_background}`,
        }}
        class="focus:outline-none w-8 h-8  rounded-full flex items-center justify-center"
      >
        <IoIosNotifications className="text-orange-500" />
      </div>
      <div class="pl-3">
        <p tabindex="0" class="focus:outline-none text-sm leading-none">
          James Doe favourited an item
        </p>
        <p
          tabindex="0"
          class="focus:outline-none text-xs leading-3 pt-1 text-gray-500"
        >
          2 hours ago
        </p>
      </div>
    </div>
  );
};

export default NotificationMessage;
