import React, { useContext } from "react";
import { BiSort } from "react-icons/bi";
import { GlobalContext } from "../../context/GlobalContext";

const NotificationTableHead = ({ sortStatus, sortDate }) => {
  const { palette } = useContext(GlobalContext);
  return (
    <thead
      style={{
        color: palette?.dark_contrast_color,
      }}
    >
      <tr>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
        >
          Title
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
        >
          Message
        </th>

        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
        >
          Date
        </th>
      </tr>
    </thead>
  );
};

export default NotificationTableHead;
