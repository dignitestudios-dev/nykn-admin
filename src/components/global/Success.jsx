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
      className={`fixed bottom-2 right-2 transition-all duration-150 w-96  h-auto min-h-16 rounded-lg uppercase bg-green-500 text-white z-[100000] text-sm lg:text-sm font-medium ${
        success ? "flex translate-y-0 animate-bounce" : "-translate-y-32"
      } px-4 items-center justify-start gap-3`}
    >
      <MdErrorOutline className="text-lg" />
      {success}
    </div>
  );
};

export default Success;
