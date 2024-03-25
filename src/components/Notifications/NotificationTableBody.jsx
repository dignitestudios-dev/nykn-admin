import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const NotificationTableBody = ({ notification, setReload }) => {
  const { palette } = useContext(GlobalContext);
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
    <tbody className="border ">
      <tr
        className=" border-b "
        style={{ background: palette.dark_contrast_background }}
      >
        <th
          scope="row"
          className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap"
        >
          {notification?.title}
        </th>
        <th
          scope="row"
          className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap"
        >
          {notification?.message}
        </th>
        <td className="px-6 py-3">
          {convertDateToUSFormat(notification?.createdAt)}
        </td>
      </tr>
    </tbody>
  );
};

export default NotificationTableBody;
