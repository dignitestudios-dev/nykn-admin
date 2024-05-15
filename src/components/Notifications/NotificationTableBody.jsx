import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const NotificationTableBody = ({ notification, setReload }) => {
  const { palette, theme } = useContext(GlobalContext);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsEditModalOpen(false);
  };

  function getStatusFromDate(dateTimeObject) {
    const currentDateTime = new Date();
    const options = { timeZone: "America/New_York" };
    const usFormattedDateTime = currentDateTime.toLocaleString(
      "en-US",
      options
    );

    // Compare the timestamps
    if (dateTimeObject < currentDateTime) {
      console.log(dateTimeObject < usFormattedDateTime);
    } else {
      return "delivered";
    }
  }

  function convertDateToUSFormat(dateTimeString) {
    const dateObject = new Date(dateTimeString);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const usDateFormat = dateObject.toLocaleDateString("en-US", options);
    return usDateFormat;
  }
  return (
    <tr className="  ">
      <th
        scope="row"
        className="px-6 w-auto  py-3 font-medium text-gray-900 whitespace-nowrap"
      >
        <div className="w-auto flex text-xs justify-start items-center">
          {notification?.title}
        </div>
      </th>
      <th
        scope="row"
        className="px-6  w-auto  py-3 font-medium text-gray-900 whitespace-nowrap"
      >
        <div className="w-auto text-xs flex justify-start items-center">
          {notification?.message}
        </div>
      </th>
      <td className="px-6  w-auto text-xs  py-3">
        {convertDateToUSFormat(notification?.createdAt)}
      </td>
    </tr>
  );
};

export default NotificationTableBody;
