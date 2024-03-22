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
      className={`fixed bottom-2 right-2 transition-all duration-150 w-96  h-auto min-h-16 rounded-lg uppercase bg-red-500/[0.12] text-red-500 z-[100000] text-sm lg:text-lg font-medium ${
        error ? "flex translate-y-0 animate-bounce" : "-translate-y-32"
      } px-4 items-center justify-start gap-3`}
    >
      <MdErrorOutline className="text-2xl" />
      {error}
    </div>
  );
};

export default Error;
