import React, { useContext } from "react";
import BtnLoader from "../global/BtnLoader";
import { GlobalContext } from "../../context/GlobalContext";

const AuthButton = ({ text, loading }) => {
  const { palette } = useContext(GlobalContext);
  return (
    <button
      type="submit"
      className=" text-white cursor-pointer font-bold mt-4 text-sm h-14 w-full flex items-center justify-center rounded-full outline-none border-none hover:opacity-90"
      style={{
        background: palette?.brand,
      }}
    >
      {loading ? <BtnLoader /> : text}
    </button>
  );
};

export default AuthButton;
