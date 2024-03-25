import React, { useContext } from "react";
import { BiSort } from "react-icons/bi";
import { GlobalContext } from "../../context/GlobalContext";

const NotificationTableHead = ({ sortStatus, sortDate }) => {
  const { palette } = useContext(GlobalContext);
  return (
    <thead
      className="text-md text-gray-700 sticky top-0 left-0 uppercase   "
      style={{ background: palette.dark_contrast_background }}
    >
      <tr>
        <th scope="col" className="px-6 py-3">
          Title
        </th>
        <th scope="col" className="px-6 py-3">
          Message
        </th>
        <th onClick={sortDate} scope="col" className=" px-6 py-3">
          <div className="flex cursor-pointer items-center justify-start gap-1">
            <span>Date</span>
            <BiSort />
          </div>
        </th>
      </tr>
    </thead>
  );
};

export default NotificationTableHead;
