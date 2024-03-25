import React, { useState, useEffect, useContext } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { TiPlus } from "react-icons/ti";
import NotificationTableHead from "./NotificationTableHead";
import NotificationTableBody from "./NotificationTableBody";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import Cookies from "js-cookie";

const NotificationTable = () => {
  const { palette, baseUrl } = useContext(GlobalContext);
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const getData = () => {
    const token = Cookies.get("token");
    if (token) {
      setLoading(true);
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      axios
        .get(`${baseUrl}/getNotifications`, { headers })
        .then((response) => {
          setResponse(response?.data);

          setLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      navigate("/auth/login/");
    }
  };

  // Filter data based on user input in title or message
  const filteredData = response?.filter((notification) =>
    notification.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  const [sortDateDirection, setSortDateDirection] = useState("asc"); // or 'desc'
  const sortDate = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);

      if (sortDateDirection === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    setResponse(sortedData);
    setSortDateDirection(sortDateDirection === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
    getData();
  }, []);

  const [reload, setReload] = useState(false);
  useEffect(() => {
    getData();
  }, [reload]);

  return (
    <div
      className="w-full  rounded-xl flex flex-col justify-start px-2 md:px-6 h-auto shadow-sm items-start"
      style={{ background: palette.background }}
    >
      <div className="w-full h-auto flex flex-col justify-start items-start gap-2 ">
        <div className="w-full h-16 flex items-center  justify-start">
          <div className="text-2xl flex justify-start gap-1 items-center text-gray-900 font-semibold">
            <span>Push Notifications</span>
            <span className="text-2xl text-gray-400">({50})</span>
          </div>
        </div>

        <div className="w-full h-auto flex justify-between items-center">
          <div className="w-40 h-10 md:w-60 md:h-10 relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full h-full rounded-xl bg-gray-100 border border-gray-400 outline-none focus:ring-2 focus:ring-blue-500   px-3"
              placeholder="Search"
            />
            <button
              className="w-10 h-[80%]  text-white outline-none border-none  flex items-center justify-center absolute top-1 right-1 rounded-lg"
              style={{ background: palette.brand }}
            >
              <IoSearchOutline className="text-2xl" />
            </button>
          </div>

          <Link
            to="/dashboard/notifications/createnotifications/"
            className="w-auto h-8 px-2 rounded-xl md:h-10 flex  text-white justify-center items-center gap-[1px] transition-all duration-200 hover:opacity-90 shadow-sm "
            style={{ background: palette.brand }}
          >
            <TiPlus />
            <span className="text-xs md:text-md font-medium">
              Create Notification
            </span>
          </Link>
        </div>
      </div>

      <div className="w-full flex flex-col py-4 lg:px-2 justify-start items-start">
        <div className="relative overflow-x-auto w-full h-auto overflow-y-auto">
          {filteredData?.length > 0 ? (
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <NotificationTableHead sortDate={sortDate} />
              {filteredData.map((notification, key) => {
                return (
                  <NotificationTableBody
                    key={key}
                    notification={notification}
                    setReload={setReload}
                  />
                );
              })}
            </table>
          ) : (
            <span className="text-3xl font-bold flex flex-col w-full justify-center items-center h-auto py-4">
              <img
                src="/nothinghere.jpg"
                className="w-full md:w-1/2 lg:w-1/4"
              />
              Nothing here
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationTable;
