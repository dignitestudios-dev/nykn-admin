import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import AuthButton from "../components/auth/AuthButton";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthInput from "../components/auth/AuthInput";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineLock } from "react-icons/md";
import axios from "axios";
import FormError from "../components/global/FormError";
import { validateEmail } from "../utils/validators";

const VerifyEmail = () => {
  const {
    formError,
    setFormError,
    emailError,
    passwordError,
    setEmailError,
    setPasswordError,
    baseUrl,
    palette,
    startTimer,
  } = useContext(GlobalContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // Form Input States:
  const [email, setEmail] = useState("");

  const handleEmailVerification = () => {
    if (email == "") {
      setEmailError("*Email is required.");
      setTimeout(() => {
        setEmailError(false);
      }, 3000);
    } else if (!validateEmail(email)) {
      setEmailError("Email not in correct format.");
      setTimeout(() => {
        setEmailError(false);
      }, 3000);
    } else {
      setLoading(true);
      localStorage?.setItem("email", email);
      axios
        .post(`${baseUrl}/auth/forgotPasswordAdmin`, {
          email: email,
        })
        .then(
          (response) => {
            localStorage.setItem("email", email);
            navigate("/verify-otp/");
            startTimer();
            setLoading(false);
          },
          (error) => {
            setLoading(false);
            console.log(error);
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
          Forgot Password!
        </h1>
        <span className="text-sm lg:text-lg text-[#959595] font-medium">
          Enter your registered email
        </span>
      </div>

      <div className="w-full h-auto mt-0 lg:mt-8 mb-4 flex flex-col  justify-start items-start">
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
        <AuthButton
          onClick={handleEmailVerification}
          text={"Next"}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default VerifyEmail;
