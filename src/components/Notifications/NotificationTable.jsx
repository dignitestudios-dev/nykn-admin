import React, { useState, useEffect, useContext, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { TiPlus } from "react-icons/ti";
import NotificationTableHead from "./NotificationTableHead";
import NotificationTableBody from "./NotificationTableBody";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import Cookies from "js-cookie";
import NotificationModal from "./NotificationModal";
import Loader from "../global/Loader";

const NotificationTable = () => {
  const { palette, baseUrl, theme } = useContext(GlobalContext);
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const notificationAddRef = useRef();
  const [updateData, setUpdateData] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

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

  useEffect(() => {
    getData();
  }, [updateData]);

  const [reload, setReload] = useState(false);
  useEffect(() => {
    getData();
  }, [reload]);

  return (
    <div className="w-full  flex flex-col justify-start px-2 md:px-6 h-auto items-start">
      <div className="w-full h-auto flex flex-col justify-start items-start gap-2 ">
        <div className="w-full h-16 flex items-center  justify-start">
          <div className="text-3xl flex justify-start gap-1 items-center  font-bold">
            <span style={{ color: palette?.brand }}>Push Notifications</span>
            <span className="text-2xl text-gray-400">({response?.length})</span>
          </div>
        </div>

        {/* Category Add Modal */}
        <NotificationModal
          updateData={setUpdateData}
          isOpen={isNotificationOpen}
          setIsOpen={setIsNotificationOpen}
          notificationAddRef={notificationAddRef}
        />

        <div className="w-full h-auto flex justify-between items-center">
          <div className="w-64 relative bg-white rounded-full shadow border border-[#eaeaea]">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full h-12 rounded-full outline-none border-none px-4 text-sm"
              placeholder="Search"
              style={{
                color: palette?.color,
              }}
            />
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center absolute top-2 right-2 "
              style={{ background: palette?.brand, color: palette?.color }}
            >
              <IoSearch className="text-white" />
            </button>
          </div>

          <button
            onClick={() => setIsNotificationOpen(true)}
            className="w-auto h-12 px-4 rounded-full  flex  text-white justify-center items-center gap-[1px] transition-all duration-200 hover:opacity-90 shadow-sm "
            style={{ background: palette.brand }}
          >
            <span className="text-xs md:text-md font-medium">
              Create Notification
            </span>
          </button>
        </div>
      </div>

      <div className="w-full flex flex-col py-4 lg:px-2 justify-start items-start">
        <div className="relative overflow-x-auto w-full h-auto ">
          {loading ? (
            <Loader />
          ) : filteredData?.length > 0 ? (
            <div className="w-full h-auto flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow border border-[#eaeaea] overflow-hidden  sm:rounded-lg">
                    <table
                      className={`w-full  divide-y ${
                        theme == "dark" ? "divide-[#3d3d3d]" : "divide-gray-200"
                      }`}
                    >
                      <NotificationTableHead sortDate={sortDate} />
                      <tbody
                        className={` divide-y ${
                          theme == "dark"
                            ? "divide-[#3d3d3d]"
                            : "divide-gray-200"
                        }`}
                        style={{
                          color: palette?.dark_contrast_color,
                        }}
                      >
                        {filteredData?.reverse()?.map((notification, key) => {
                          return (
                            <NotificationTableBody
                              key={key}
                              notification={notification}
                              setReload={setReload}
                            />
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
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
