import React, { useState } from "react";
import { useContext } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { GlobalContext } from "../../context/GlobalContext";

const AuthInput = ({ icon, state, setState, text, type, error }) => {
  const [isPassVisible, setIsPassVisible] = useState(false);
  const { palette } = useContext(GlobalContext);

  return (
    <div
      className={`w-full h-10 rounded-xl flex items-center justify-start  ${
        error && "error"
      } mt-5`}
      style={{
        background: palette?.dark_contrast_background,
      }}
    >
      <span
        className={`w-[12%] md:w-[8%]  text-lg h-full flex items-center rounded-l-xl justify-center `}
        style={{
          border: error
            ? `1px solid red`
            : `1px solid ${palette?.light_contrast_background}`,
          color: palette?.light_contrast_color,
          background: palette?.dark_contrast_background,
        }}
      >
        {icon}
      </span>
      <div
        className={` w-[88%] md:w-[92%]  h-full flex items-center justify-center    rounded-r-xl relative`}
        style={{
          borderRight: error
            ? `1px solid red`
            : `1px solid ${palette?.light_contrast_background}`,
          borderTop: error
            ? `1px solid red`
            : `1px solid ${palette?.light_contrast_background}`,
          borderBottom: error
            ? `1px solid red`
            : `1px solid ${palette?.light_contrast_background}`,
        }}
      >
        <input
          type={isPassVisible ? "text" : type}
          placeholder={text}
          className="w-full outline-none  rounded-r-xl  h-full px-3 text-sm font-medium "
          style={{
            background: palette?.dark_contrast_background,
            color: palette?.color,
          }}
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <button
          onClick={() => setIsPassVisible((prev) => !prev)}
          className="absolute top-[0.74rem] right-2"
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
