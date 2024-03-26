import React from "react";
import Footer from "../components/global/Footer";
import AuthNavbar from "../components/auth/AuthNavbar";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AuthTemplate = ({ page }) => {
  const { palette, isLoggedIn, baseUrl, setIsLoggedIn } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const validateToken = () => {
    const token = Cookies.get("token");

    if (token) {
      axios
        .post(`${baseUrl}/validateToken`, {
          token: token,
        })
        .then(
          (response) => {
            if (response.data.valid == true) {
              navigate("/discover");
            } else {
              navigate("/login");
            }
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    validateToken();
  }, []);
  return (
    <div
      className="w-full h-auto  transition-all duration-200 overflow-x-hidden flex flex-col justify-center items-start relative"
      style={{
        background: palette?.background,
        color: palette?.color,
      }}
    >
      <AuthNavbar />

      <div className="p-4  w-full h-auto flex items-center justify-center  ">
        <div
          className="w-full min-h-[20rem] h-auto  rounded-3xl  flex flex-col lg:flex-row  justify-center items-start"
          style={{
            border: `2px solid ${palette?.brand}`,
          }}
        >
          <div className="w-full lg:w-1/2 h-full p-4 md:p-6 lg:py-10 lg:px-8 rounded-l-3xl ">
            {page}
          </div>
          <div className="w-full lg:w-1/2 py-14 h-full  rounded-[23px] lg:rounded-r-[23px] flex flex-col gap-10 items-center justify-center">
            <img src="/logo.svg" className="h-52 md:h-60 lg:h-auto " />

            {/* <div className="w-[70%] h-auto flex gap-3 justify-center items-center">
              <button className="w-auto h-auto">
                <img src="/app-store-btn.png" />
              </button>

              <button className="w-auto h-auto">
                <img src="/play-store-btn.png" />
              </button>
            </div> */}
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default AuthTemplate;
