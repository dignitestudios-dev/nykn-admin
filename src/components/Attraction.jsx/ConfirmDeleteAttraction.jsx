import React, { useContext, useRef } from "react";
import { LuImagePlus } from "react-icons/lu";
import { GlobalContext } from "../../context/GlobalContext";

const ConfirmDeleteAttraction = ({ isOpen, setIsOpen }) => {
  const deleteAttractionRef = useRef();
  const { palette, theme } = useContext(GlobalContext);

  const toggleModal = (e) => {
    if (!deleteAttractionRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  return (
    <div
      onClick={toggleModal}
      id="attraction-delete-modal"
      className={`fixed top-0 left-0 ${
        theme == "dark" ? "bg-[#fff]/[0.2]" : "bg-[#000]/[0.2]"
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
          style={{
            color: palette?.light_contrast_color,
          }}
        >
          Are you sure that you want delete this attraction?{" "}
        </span>

        <div className="flex justify-center mt-4 items-start w-full gap-2">
          <button className="w-20 h-8  transition-all bg-red-500 duration-150 hover:opacity-90  outline-none border-none text-white text-md font-medium rounded-full">
            Yes
          </button>
          <button
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
