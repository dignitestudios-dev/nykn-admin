import React from "react";
import { useContext } from "react";
import { FaPhone, FaFacebook } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import { SiInstagram } from "react-icons/si";

const Footer = () => {
  const { palette } = useContext(GlobalContext);
  return (
    <div
      className="shadow-sm w-full h-auto p-5 lg:p-0  flex flex-col lg:flex-row  justify-start items-start"
      style={{
        background: palette?.dark_contrast_background,

        color: palette?.light_contrast_color,
      }}
    >
      <div className="w-full lg:w-[25%] h-auto lg:h-48 flex gap-3 items-center justify-center ">
        <FaPhone className="text-md " />
        <span className="text-sm font-semibold ">(123)-456-7890</span>
      </div>

      <div className="w-full lg:w-[50%] h-auto lg:h-48 py-8 flex flex-col gap-2 items-center justify-center ">
        <Link to="/">
          {/* <img src="/logo.svg" /> */}
          <h1 className="text-2xl font-bold" style={{ color: palette?.brand }}>
            NYKN
          </h1>
        </Link>

        <div className="flex my-auto justify-center gap-1 items-center">
          <IoMail className="text-md " />
          <span className="text-sm font-semibold ">contact@nykn.com</span>
        </div>

        <div className=" text-center text-sm font-normal">
          Copyright &#174; 2023 All rights reserved | This is made by{" "}
          <Link
            to="https://dignitestudios.com/"
            className="text-sm font-semibold "
            style={{
              color: palette?.brand,
            }}
          >
            Dignite Studios
          </Link>
        </div>
      </div>

      <div className="w-full lg:w-[25%] h-auto lg:h-48 flex items-center justify-center gap-3 ">
        <Link to="/">
          <FaFacebook
            className="text-xl md::text-2xl"
            style={{ color: palette?.color }}
          />
        </Link>

        <Link to="/">
          <FaXTwitter
            className="text-xl md::text-2xl"
            style={{ color: palette?.color }}
          />
        </Link>

        <Link to="/">
          <SiInstagram
            className="text-xl md::text-2xl"
            style={{ color: palette?.color }}
          />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
