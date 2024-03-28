import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import axios from "axios";
import Cookies from "js-cookie";
import BtnLoader from "../global/BtnLoader";

const LabelModal = ({ isOpen, setIsOpen, labelAddRef, updateData }) => {
  const { palette, theme, setError, setSuccess, baseUrl } =
    useContext(GlobalContext);
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    // Split the input value on spaces
    const wordsArray = inputValue.split(",");
    // Update the state with the new array of words
    setWords(wordsArray);
  };

  const toggleModal = (e) => {
    if (!labelAddRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (words.length == 0) {
      setError("Labels not provided.");
    } else {
      const token = Cookies.get("token");
      if (token) {
        setLoading(true);
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        axios
          .post(
            `${baseUrl}/addLabel`,
            {
              labels: words.splice(0, words?.length - 1),
            },
            { headers }
          )
          .then(
            (response) => {
              setLoading(false);
              updateData((prev) => !prev);
              setWords([]);
              document.getElementById("label-form").reset();
              setSuccess("Labels Added Successfully.");
              // navigate("/categories");
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
    }
  };

  return (
    <div
      onClick={toggleModal}
      id="label-add-modal"
      className={`fixed top-0 left-0 ${
        theme == "dark" ? "bg-[#fff]/[0.2]" : "bg-[#000]/[0.2]"
      }  z-[1000] w-screen h-screen ${
        isOpen ? "flex" : "hidden"
      } items-center justify-center`}
    >
      <div
        ref={labelAddRef}
        className="w-96 h-auto rounded-3xl flex flex-col gap-2 justify-start items-center  p-4"
        style={{ background: palette?.background, color: palette?.color }}
      >
        <span className="text-2xl font-bold">Add Label</span>

        <form
          id="label-form"
          className="w-full h-auto flex flex-col gap-1 justify-start items-start"
        >
          <input
            onChange={handleInputChange}
            className="w-full h-10 rounded-full text-sm  outline-none border-none px-4"
            style={{
              background: palette?.dark_contrast_background,
            }}
            type="text"
            placeholder="Label"
          />
        </form>
        <div className="w-full h-auto flex flex-wrap gap-2  justify-start items-center ">
          {words?.slice(0, -1)?.map((word, key) => {
            return (
              <span
                className="w-auto h-6 px-1 flex justify-center items-center text-[9.5px] rounded-full font-normal bg-blue-500 text-white"
                key={key}
              >
                {word}
              </span>
            );
          })}
        </div>

        <button
          onClick={handleSubmit}
          style={{
            background: palette?.brand,
          }}
          className="w-full h-10 flex justify-center items-center  transition-all duration-150 hover:opacity-90  outline-none border-none text-white text-md font-medium rounded-full"
        >
          {loading ? <BtnLoader /> : "Add Label"}
        </button>
      </div>
    </div>
  );
};

export default LabelModal;
