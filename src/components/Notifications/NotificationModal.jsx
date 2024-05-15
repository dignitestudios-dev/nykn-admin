import React, { useContext, useRef, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { LuImagePlus } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import axios from "axios";
import BtnLoader from "../global/BtnLoader";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const NotificationModal = ({
  isOpen,
  setIsOpen,
  notificationAddRef,
  updateData,
}) => {
  const navigate = useNavigate();
  const { palette, theme, baseUrl, setError, setSuccess } =
    useContext(GlobalContext);

  const toggleModal = (e) => {
    if (!notificationAddRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = Cookies.get("token");
    if (token) {
      setLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .post(
          `${baseUrl}/createNotification`,
          {
            title: title,
            message: message,
          },
          { headers }
        )
        .then(
          (response) => {
            setLoading(false);
            updateData((prev) => !prev);
            setSuccess("Notification Created Successfully.");
            setTitle("");
            setMessage("");
            setIsOpen(false);
          },
          (error) => {
            setError(error?.response?.data?.error);

            setLoading(false);
          }
        );
    } else {
      Cookies.remove("token");
      navigate("/login");
    }
  };

  return (
    <div
      onClick={toggleModal}
      id="notification-add-modal"
      className={`fixed top-0 left-0 transition-all duration-500  z-[1000] w-screen h-screen ${
        isOpen ? "scale-1" : "scale-0"
      } flex items-center justify-center`}
    >
      <form
        onSubmit={handleSubmit}
        ref={notificationAddRef}
        className="w-96 h-auto shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-3xl flex flex-col gap-2 justify-start items-center  p-4"
        style={{ background: palette?.background, color: palette?.color }}
      >
        <span className="text-2xl font-bold">Add Notification</span>

        <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-12 rounded-full text-sm border border-[#eaeaea] shadow  outline-none  px-4"
            type="text"
            placeholder="Title"
          />
        </div>

        <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-32 resize-none rounded-xl text-sm border border-[#eaeaea] shadow  outline-none  py-2 px-4"
            type="text"
            placeholder="Message"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            background: palette?.brand,
          }}
          className="w-full h-12 flex justify-center items-center  transition-all duration-150 hover:opacity-90  outline-none border-none text-white text-md font-medium rounded-full"
        >
          {loading ? <BtnLoader /> : "Add Notification"}
        </button>
      </form>
    </div>
  );
};

export default NotificationModal;
