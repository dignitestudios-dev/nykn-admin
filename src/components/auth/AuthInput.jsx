import React, { useState } from "react";
import { useContext } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { GlobalContext } from "../../context/GlobalContext";

const AuthInput = ({ icon, state, setState, text, type, error }) => {
  const [isPassVisible, setIsPassVisible] = useState(false);
  const { palette } = useContext(GlobalContext);

  return (
    <div
      className={`w-full bg-white h-14 rounded-full flex items-center justify-start  ${
        error && "error"
      } mt-5`}
    >
      <span
        className={`w-[12%] md:w-[8%]  text-lg h-full flex items-center rounded-l-full justify-center `}
        style={{
          border: error ? `2px solid red` : `2px solid #eaeaea`,
          color: palette?.light_contrast_color,
        }}
      >
        {icon}
      </span>
      <div
        className={` w-[88%] md:w-[92%]  h-full flex items-center justify-center    rounded-r-full relative`}
        style={{
          borderRight: error ? `2px solid red` : `2px solid #eaeaea`,
          borderTop: error ? `2px solid red` : `2px solid #eaeaea`,
          borderBottom: error ? `2px solid red` : `2px solid #eaeaea`,
        }}
      >
        <input
          type={isPassVisible ? "text" : type}
          placeholder={text}
          className="w-full outline-none  rounded-r-full  h-full px-3 text-sm font-medium "
          style={{
            color: palette?.color,
          }}
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setIsPassVisible((prev) => !prev)}
          className="absolute top-[1.2rem] right-3 bg-transparent"
          style={{
            color: palette?.light_contrast_color,
          }}
        >
          {type == "password" && (!isPassVisible ? <BsEye /> : <BsEyeSlash />)}
        </button>
      </div>
    </div>
  );
};

export default AuthInput;
