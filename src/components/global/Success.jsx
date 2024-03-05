import React, { useContext, useEffect } from "react";
import { MdErrorOutline } from "react-icons/md";
import { GlobalContext } from "../../context/GlobalContext";

const Success = () => {
  const { success, setSuccess } = useContext(GlobalContext);

  useEffect(() => {
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  });
  return (
    <div
      className={`fixed top-14 left-0 transition-all duration-150 w-full h-12 bg-green-500 text-white z-20 text-xs lg:text-sm ${
        success ? "flex translate-y-0" : "-translate-y-32"
      } px-2 items-center justify-start gap-3`}
    >
      <MdErrorOutline className="text-lg" />
      {success}
    </div>
  );
};

export default Success;
