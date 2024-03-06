import React, { useContext, useState } from "react";
import AuthButton from "../components/auth/AuthButton";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthInput from "../components/auth/AuthInput";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineLock } from "react-icons/md";
import axios from "axios";
import { GlobalContext } from "../context/GlobalContext";
import SocialLogins from "../components/auth/SocialLogins";
import FormError from "../components/global/FormError";
import Cookies from "js-cookie";
import { validateEmail } from "../utils/validators";

const RegisterUser = () => {
  const {
    formError,
    setFormError,
    emailError,
    passwordError,
    setEmailError,
    setPasswordError,
    baseUrl,
    palette,
  } = useContext(GlobalContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // Form Input States:
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);

  const handleLogin = () => {
    if (email == "") {
      setEmailError("Email is required.");
      setTimeout(() => {
        setEmailError(false);
      }, 3000);
    } else if (!validateEmail(email)) {
      setEmailError("Email not in correct format.");
      setTimeout(() => {
        setEmailError(false);
      }, 3000);
    } else if (password == "") {
      setPasswordError("Password is required.");
      setTimeout(() => {
        setPasswordError(false);
      }, 3000);
    } else if (password.length < 6) {
      setPasswordError("Minimum password length is 6.");
      setTimeout(() => {
        setPasswordError(false);
      }, 3000);
    } else {
      setLoading(true);
      axios
        .post(`${baseUrl}/admin-login`, {
          email: email,
          password: password,
        })
        .then(
          (response) => {
            Cookies.set("token", response?.data?.data?.token, { expires: 7 });
            Cookies.set("isLoggedIn", true, { expires: 7 });
            if (response?.data?.data?.token) {
              navigate("/discover/");
            }
            setLoading(false);
          },
          (error) => {
            setLoading(false);
            setFormError(error?.response?.data?.error);
          }
        );
    }
  };
  return (
    <div
      className="w-full h-auto  transition-all duration-200 overflow-x-hidden flex flex-col justify-center items-start relative"
      style={{
        background: palette?.background,
        color: palette?.color,
      }}
    >
      <div className="p-4  w-full h-auto flex items-center justify-center  ">
        <div
          className="w-full min-h-[20rem] h-auto  rounded-3xl  flex flex-col lg:flex-row  justify-center items-start"
          style={{
            border: `2px solid ${palette?.brand}`,
          }}
        >
          <div className="w-full lg:w-1/2 h-full p-4 md:p-6 lg:py-10 lg:px-8 rounded-l-3xl ">
            <div className="w-full h-full flex flex-col justify-start items-start gap-3">
              <div className="w-full h-auto flex flex-col gap-2 justify-start items-start">
                <h1
                  className=" text-2xl lg:text-3xl font-bold"
                  style={{
                    color: palette?.color,
                  }}
                >
                  Create User!
                </h1>
                <span
                  className="text-sm lg:text-lg  font-medium"
                  style={{
                    color: palette?.light_contrast_color,
                  }}
                >
                  Enter the below details to create!
                </span>
              </div>

              <div className="w-full h-auto mt-0 lg:mt-2 mb-4 flex flex-col  justify-start items-start">
                {formError && <FormError />}
                <div className="w-full h-auto flex flex-col gap-[2px]">
                  <AuthInput
                    text={"Full Name"}
                    icon={<HiOutlineMail />}
                    state={name}
                    setState={setName}
                    type={"text"}
                    error={nameError}
                  />
                  {nameError && (
                    <label className="ml-3 text-xs font-medium capitalize text-red-500">
                      {nameError}
                    </label>
                  )}
                </div>
                <div className="w-full h-auto flex flex-col gap-[2px]">
                  <AuthInput
                    text={"Email Address"}
                    icon={<HiOutlineMail />}
                    state={email}
                    setState={setEmail}
                    type={"email"}
                    error={emailError}
                  />
                  {emailError && (
                    <label className="ml-3 text-xs font-medium capitalize text-red-500">
                      {emailError}
                    </label>
                  )}
                </div>
                <div className="w-full h-auto flex flex-col gap-[2px]">
                  <AuthInput
                    text={"Password"}
                    icon={<MdOutlineLock />}
                    state={password}
                    setState={setPassword}
                    type={"password"}
                    error={passwordError}
                  />
                  {passwordError && (
                    <label className="ml-3 text-xs font-medium capitalize text-red-500">
                      {passwordError}
                    </label>
                  )}
                </div>

                <AuthButton
                  onClick={handleLogin}
                  text={"Create"}
                  loading={loading}
                />
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 py-14 h-full  rounded-[23px] lg:rounded-r-[23px] flex flex-col gap-10 items-center justify-center">
            <img src="/logo.svg" className="h-52 md:h-60 lg:h-auto " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
