import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import BtnLoader from "../global/BtnLoader";

const ConfirmDeleteAttraction = ({ isOpen, setIsOpen, id }) => {
  const navigate = useNavigate();

  const deleteAttractionRef = useRef();
  const { palette, theme, baseUrl, setSuccess, setError, setActiveLink } =
    useContext(GlobalContext);

  const toggleModal = (e) => {
    if (!deleteAttractionRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const [loading, setLoading] = useState(false);

  const deleteAttraction = (e) => {
    e.preventDefault();
    const token = Cookies.get("token");

    if (token) {
      setLoading(true);

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      axios
        .delete(`${baseUrl}/DeleteSubCategory`, {
          headers,
          data: { subCategoryId: id }, // Pass data as an object
        })
        .then(
          (response) => {
            setIsOpen(false);
            setSuccess("Attraction deleted successfully.");
            navigate("/attractions");
            setActiveLink("Attractions");
          },
          (error) => {
            setError(error?.response?.data?.error);
          }
        )
        .finally(() => {
          setLoading(false);
        });
    } else {
      Cookies.remove("token");
      navigate("/login");
    }
  };

  return (
    <div
      onClick={toggleModal}
      id="attraction-delete-modal"
      className={`fixed top-0 left-0 ${
        theme === "dark" ? "bg-[#fff]/[0.2]" : "bg-[#000]/[0.2]"
      }  z-[1000] w-screen h-screen ${
        isOpen ? "flex" : "hidden"
      } items-center justify-center`}
    >
      <div
        ref={deleteAttractionRef}
        className="w-80 h-auto rounded-3xl flex flex-col gap-2 justify-start items-center  p-4"
        style={{ background: palette?.background, color: palette?.color }}
      >
        <span className="text-2xl font-bold">Delete Attraction</span>
        <span
          className="w-56 text-center text-sm font-medium"
          style={{ color: palette?.light_contrast_color }}
        >
          Are you sure that you want delete this attraction?
        </span>

        <div className="flex justify-center mt-4 items-start w-full gap-2">
          <button
            onClick={deleteAttraction}
            className="w-20 h-8  transition-all bg-red-500 duration-150 hover:opacity-90  outline-none border-none text-white text-md font-medium rounded-full"
          >
            {loading ? <BtnLoader /> : "Yes"}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="w-20 h-8  transition-all  duration-150 hover:opacity-90  outline-none border-non text-md font-medium rounded-full"
            style={{
              color: palette?.color,
              border: `2px solid ${palette?.color}`,
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteAttraction;
