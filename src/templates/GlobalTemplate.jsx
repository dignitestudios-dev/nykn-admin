import React from "react";
import Footer from "../components/global/Footer";
import { GlobalContext } from "../context/GlobalContext";
import Navbar from "../components/global/Navbar";
// import AuthenticatoinRequired from "../pages/AuthenticatoinRequired";
import { useContext, useEffect, useState } from "react";
import Error from "../components/global/Error";
import Success from "../components/global/Success";
import Sidebar from "../components/global/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { IoSearch } from "react-icons/io5";

const GlobalTemplate = ({ page, name }) => {
  const {
    sidebarActive,
    palette,
    baseUrl,
    isLoggedIn,
    setIsLoggedIn,
    setProfile,
    setProfileLoading,
    error,
    success,
  } = useContext(GlobalContext);

  const navigate = useNavigate();

  const getAdminProfile = () => {
    const token = Cookies.get("token");

    if (token) {
      setProfileLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": true,
      };
      axios.get(`${baseUrl}/users/get-profile`, { headers }).then(
        (response) => {
          setProfile(response?.data?.data?.user);
          setProfileLoading(false);
        },
        (error) => {
          if (error?.response?.status == 401) {
            setIsLoggedIn(false);
            Cookies.remove("token");
            navigate("/login");
          }
          setProfileLoading(false);
        }
      );
    } else {
      navigate("/login");
    }
  };

  // useEffect(() => {
  //   getAdminProfile();
  // }, []);

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

  return isLoggedIn ? (
    <main className="w-full transition-all duration-200 min-h-screen h-auto flex flex-col justify-start items-start relative">
      <div className="flex w-full h-auto relative  justify-start items-start">
        <Sidebar />
        <div
          className={` absolute top-0 right-0  transition-all duration-150 w-full lg:w-[calc(100%-18rem)] h-auto flex flex-col justify-start items-start`}
          style={{
            background: `${palette?.background}`,
          }}
        >
          <Navbar name={name} />
          <div className="w-full overflow-y-auto ">
            {error && <Error />}
            {success && <Success />}

            <div className="w-full min-h-[67vh] overflow-x-hidden h-auto p-2 md:p-4">
              {page}
            </div>
            {/* <Footer /> */}
          </div>
        </div>
      </div>
    </main>
  ) : (
    <h1>Auth Required</h1>
  );
};

export default GlobalTemplate;
