import React, { useContext, useEffect } from "react";
import { MdErrorOutline } from "react-icons/md";
import { GlobalContext } from "../../context/GlobalContext";

const Error = () => {
  const { error, setError } = useContext(GlobalContext);

  useEffect(() => {
    setTimeout(() => {
      setError(false);
    }, 2000);
  });
  return (
    <div
      className={`fixed top-14 left-0 transition-all duration-150 w-full h-12 bg-red-500 text-white z-20 text-xs lg:text-sm ${
        error ? "flex translate-y-0" : "-translate-y-32"
      } px-2 items-center justify-start gap-3`}
    >
      <MdErrorOutline className="text-lg" />
      {error}
    </div>
  );
};

export default Error;
