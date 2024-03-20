import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import AuthButton from "../components/auth/AuthButton";
import AuthInput from "../components/auth/AuthInput";
import { useNavigate } from "react-router-dom";
import { MdOutlineNoEncryptionGmailerrorred } from "react-icons/md";
import axios from "axios";
import FormError from "../components/global/FormError";
import Timer from "../components/global/Timer";

const VerifyOtp = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);

  const {
    formError,
    setFormError,
    baseUrl,
    palette,
    isTimerOn,
    startTimer,
    resetTimer,
  } = useContext(GlobalContext);

  const email = localStorage.getItem("email");

  // Form Input States:
  const [otp, setOtp] = useState("");

  // Form Error States
  const [otpError, setOtpError] = useState(false);

  const handleSendAgain = (e) => {
    e.preventDefault();
    setHasClicked(true);
    axios
      .post(`${baseUrl}/auth/resendOtpAdmin`, {
        email: email,
      })
      .then(
        (response) => {
          setHasClicked(false);
          startTimer();
        },
        (error) => {
          setFormError(error?.response?.data?.error);
          setHasClicked(false);
        }
      );
  };

  const handleOtpVerification = (e) => {
    e.preventDefault();
    if (otp == "") {
      setOtpError("*OTP cannot be left empty.");
      setTimeout(() => {
        setOtpError(false);
      }, 3000);
    } else if (otp.length < 4) {
      setOtpError("*OTP cannot be less than 4 digits.");
      setTimeout(() => {
        setOtpError(false);
      }, 3000);
    } else {
      setLoading(true);
      const email = localStorage.getItem("email");
      axios
        .post(`${baseUrl}/auth/verifyOtpAdmin`, {
          email: email,
          otp: otp,
        })
        .then(
          (response) => {
            console.log(response);
            // just for now
            localStorage.setItem("tokenTemp", response?.data?.token);
            resetTimer();
            navigate("/change-password/");
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

  useEffect(() => {
    const wasTimerRunning = localStorage.getItem("isTimerOn");
    if (wasTimerRunning) {
      startTimer();
    } else {
      resetTimer();
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-start items-center gap-3">
      <div className="w-full h-auto flex flex-col gap-2 justify-start items-center">
        <h1
          className=" text-2xl lg:text-3xl font-bold"
          style={{
            color: palette?.color,
          }}
        >
          We just sent you an email!
        </h1>
        <span className="text-sm lg:text-lg text-center text-[#959595] font-medium">
          Enter the verification code sent to {email}
        </span>
      </div>

      <form
        onSubmit={handleOtpVerification}
        className="w-full h-auto flex flex-col justify-start items-center gap-3"
      >
        {formError && <FormError />}

        <div className="w-full h-auto flex flex-col gap-[2px]">
          <AuthInput
            text={"OTP Code"}
            icon={<MdOutlineNoEncryptionGmailerrorred />}
            state={otp}
            setState={setOtp}
            type={"text"}
            error={otpError}
          />
          {otpError && (
            <label className="ml-3 text-xs font-medium capitalize text-red-500">
              {otpError}
            </label>
          )}
        </div>

        <AuthButton text={"Verify"} loading={loading} />
      </form>

      <div className="w-[80%] mt-2 h-auto flex justify-center items-center">
        <div className="w-auto flex justify-center items-center gap-1">
          <span className="text-[#959595] text-sm font-medium">
            Didn't recieved a code?
          </span>
          <button
            disabled={isTimerOn || hasClicked}
            onClick={handleSendAgain}
            className="text-sm  font-semibold"
            style={{ color: palette.brand }}
          >
            {isTimerOn ? <Timer /> : "Send Again"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
