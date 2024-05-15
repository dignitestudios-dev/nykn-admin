import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Link } from "react-router-dom";
import Graph from "./Graph";

const TransactionGraph = () => {
  const { palette, profile } = useContext(GlobalContext);
  return (
    <div
      style={{
        color: palette?.dark_contrast_color,
      }}
      className="w-full shadow border border-[#eaeaea]  min-h-[20.5rem] h-auto md:h-[20.5rem] p-2 rounded-md flex  justify-start items-start "
    >
      <div className="w-full h-auto flex flex-col gap-4 justify-start  p-2 lg:p-4  items-start">
        <div className="w-full h-6 flex justify-center items-center  ">
          <span className="text-lg lg:text-xl font-semibold ">
            Transactions
          </span>
        </div>

        <div className="w-full h-60 text-xs ">
          <Graph />
        </div>
      </div>
    </div>
  );
};

export default TransactionGraph;
