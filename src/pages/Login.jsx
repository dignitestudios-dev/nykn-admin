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

const Login = () => {
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

  const handleLogin = (e) => {
    e.preventDefault();
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
        .post(`${baseUrl}/auth/adminLogin`, {
          email: email,
          password: password,
        })
        .then(
          (response) => {
            Cookies.set("token", response?.data?.token, { expires: 7 });
            Cookies.set("isLoggedIn", true, { expires: 7 });
            if (response?.data?.token) {
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
    <div className="w-full h-full flex flex-col justify-start items-start gap-3">
      <div className="w-full h-auto flex flex-col gap-2 justify-start items-start">
        <h1
          className=" text-2xl lg:text-3xl font-bold"
          style={{
            color: palette?.color,
          }}
        >
          Welcome back!
        </h1>
        <span
          className="text-sm lg:text-lg  font-medium"
          style={{
            color: palette?.light_contrast_color,
          }}
        >
          Enter the below details to log in
        </span>
      </div>

      <form
        onSubmit={handleLogin}
        className="w-full h-auto mt-0 lg:mt-8 mb-4 flex flex-col  justify-start items-start"
      >
        {formError && <FormError />}
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
        <div className="w-full h-auto mt-1 flex justify-end items-center">
          <Link
            to="/verify-email"
            className="text-xs font-semibold text-blue-500"
          >
            Forgot Password?
          </Link>
        </div>
        <AuthButton text={"Login"} loading={loading} />
      </form>
    </div>
  );
};

export default Login;
