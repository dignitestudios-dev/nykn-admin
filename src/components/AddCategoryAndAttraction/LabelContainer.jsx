import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const LabelContainer = () => {
  const { palette } = useContext(GlobalContext);
  const [words, setWords] = useState([]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    // Split the input value on spaces
    const wordsArray = inputValue.split(" ");
    // Update the state with the new array of words
    setWords(wordsArray);
  };

  return (
    <div
      id="add-new-label"
      className="w-full  h-auto flex  flex-col gap-2 justify-start rounded-3xl items-center  p-4"
      style={{
        background: palette?.light_contrast_background,
        color: palette?.color,
      }}
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
  );
};

export default LabelContainer;
