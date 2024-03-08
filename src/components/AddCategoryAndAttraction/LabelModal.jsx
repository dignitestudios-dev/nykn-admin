import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const LabelModal = ({ isOpen, setIsOpen, labelAddRef }) => {
  const { palette, theme } = useContext(GlobalContext);
  const [words, setWords] = useState([]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    // Split the input value on spaces
    const wordsArray = inputValue.split(" ");
    // Update the state with the new array of words
    setWords(wordsArray);
  };

  const toggleModal = (e) => {
    if (!labelAddRef.current.contains(e.target)) {
      setIsOpen(false);
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

        <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
          <input
            onChange={handleInputChange}
            className="w-full h-10 rounded-full text-sm  outline-none border-none px-4"
            style={{
              background: palette?.dark_contrast_background,
            }}
            type="text"
            placeholder="Label"
          />
        </div>
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
          style={{
            background: palette?.brand,
          }}
          className="w-full h-10  transition-all duration-150 hover:opacity-90  outline-none border-none text-white text-md font-medium rounded-full"
        >
          Add Label
        </button>
      </div>
    </div>
  );
};

export default LabelModal;
