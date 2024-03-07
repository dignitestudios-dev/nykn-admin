import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Link } from "react-router-dom";
import Graph from "./Graph";

const TransactionGraph = () => {
  const { palette, profile } = useContext(GlobalContext);
  return (
    <div
      style={{
        background: palette?.dark_contrast_background,
        color: palette?.dark_contrast_color,
        borderBottom: `2px solid ${palette?.dark_contrast_background}`,
      }}
      className="w-full shadow lg:w-[60%] min-h-[20.5rem] h-auto md:h-[20.5rem] p-2 rounded-md flex  justify-start items-start "
    >
      <div className="w-full h-auto flex flex-col gap-4 justify-start  p-2 lg:p-4  items-start">
        <div className="w-full h-6 flex justify-between items-center  ">
          <span className="text-lg lg:text-xl font-semibold ">
            Transactions
          </span>

          <div className="w-auto h-auto flex justify-start items-center gap-[2px]">
            <div className="w-auto h-auto flex justify-start items-center gap-[2px]">
              <span className="w-2 h-2 rounded-full bg-[#3FB743]" />

              <span className="text-xs ">Paid</span>
            </div>
          </div>
        </div>

        <div className="w-full h-60 text-xs ">
          <Graph />
        </div>
      </div>
    </div>
  );
};

export default TransactionGraph;
