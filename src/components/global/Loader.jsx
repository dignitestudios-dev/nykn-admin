import React from "react";
import { ImBlocked } from "react-icons/im";

const Loader = () => {
  return (
    <div className="relative overflow-x-auto w-full h-[60vh] flex justify-center items-center ">
      <svg
        width="60"
        height="60"
        fill="#407BA7"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="1" y="1" rx="1" width="10" height="10">
          <animate
            id="spinner_c7A9"
            begin="0;spinner_23zP.end"
            attributeName="x"
            dur="0.2s"
            values="1;13"
            fill="freeze"
          ></animate>
          <animate
            id="spinner_Acnw"
            begin="spinner_ZmWi.end"
            attributeName="y"
            dur="0.2s"
            values="1;13"
            fill="freeze"
          ></animate>
          <animate
            id="spinner_iIcm"
            begin="spinner_zfQN.end"
            attributeName="x"
            dur="0.2s"
            values="13;1"
            fill="freeze"
          ></animate>
          <animate
            id="spinner_WX4U"
            begin="spinner_rRAc.end"
            attributeName="y"
            dur="0.2s"
            values="13;1"
            fill="freeze"
          ></animate>
        </rect>
        <rect x="1" y="13" rx="1" width="10" height="10">
          <animate
            id="spinner_YLx7"
            begin="spinner_c7A9.end"
            attributeName="y"
            dur="0.2s"
            values="13;1"
            fill="freeze"
          ></animate>
          <animate
            id="spinner_vwnJ"
            begin="spinner_Acnw.end"
            attributeName="x"
            dur="0.2s"
            values="1;13"
            fill="freeze"
          ></animate>
          <animate
            id="spinner_KQuy"
            begin="spinner_iIcm.end"
            attributeName="y"
            dur="0.2s"
            values="1;13"
            fill="freeze"
          ></animate>
          <animate
            id="spinner_arKy"
            begin="spinner_WX4U.end"
            attributeName="x"
            dur="0.2s"
            values="13;1"
            fill="freeze"
          ></animate>
        </rect>
        <rect x="13" y="13" rx="1" width="10" height="10">
          <animate
            id="spinner_ZmWi"
            begin="spinner_YLx7.end"
            attributeName="x"
            dur="0.2s"
            values="13;1"
            fill="freeze"
          ></animate>
          <animate
            id="spinner_zfQN"
            begin="spinner_vwnJ.end"
            attributeName="y"
            dur="0.2s"
            values="13;1"
            fill="freeze"
          ></animate>
          <animate
            id="spinner_rRAc"
            begin="spinner_KQuy.end"
            attributeName="x"
            dur="0.2s"
            values="1;13"
            fill="freeze"
          ></animate>
          <animate
            id="spinner_23zP"
            begin="spinner_arKy.end"
            attributeName="y"
            dur="0.2s"
            values="1;13"
            fill="freeze"
          ></animate>
        </rect>
      </svg>
    </div>
  );
};

export default Loader;
