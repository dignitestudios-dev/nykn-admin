import React, { useState, useContext } from "react";
import AuthButton from "../components/auth/AuthButton";
import AuthInput from "../components/auth/AuthInput";
import { MdOutlineLock } from "react-icons/md";
import axios from "axios";
import { GlobalContext } from "../context/GlobalContext";
import FormError from "../components/global/FormError";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();

  const { formError, setFormError, baseUrl, palette } =
    useContext(GlobalContext);

  const [loading, setLoading] = useState(false);

  // form states
  const [password, setPassword] = useState("");
  const [reEnterPass, setReEnterPass] = useState("");

  // form error states
  const [passError, setPassError] = useState(false);
  const [rePassError, setRePassError] = useState(false);

  const handleChangePass = (e) => {
    e.preventDefault();
    if (password == "") {
      setPassError("*Password is required");
      setTimeout(() => {
        setPassError(false);
      }, 3000);
    } else if (password.length < 6) {
      setPassError("*Password cannot be less than 6 characters");
      setTimeout(() => {
        setPassError(false);
      }, 3000);
    } else if (reEnterPass == "") {
      setRePassError("*Re-enter password is required");
      setTimeout(() => {
        setRePassError(false);
      }, 3000);
    } else if (reEnterPass !== password) {
      setRePassError("*Password doesn't match");
      setTimeout(() => {
        setRePassError(false);
      }, 3000);
    } else {
      // just for now
      const tokenTemp = localStorage.getItem("tokenTemp");
      setLoading(true);
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenTemp}`,
      };
      axios
        .post(
          `${baseUrl}/auth/resetPasswordAdmin`,
          {
            newPassword: password,
            confirmPassword: reEnterPass,
          },
          { headers }
        )
        .then(
          (response) => {
            console.log(response);
            localStorage.removeItem("tokenTemp");
            navigate("/password-updated/");
            setLoading(false);
          },
          (error) => {
            setLoading(false);

            setFormError(error?.response?.data?.message);
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
          Set a new Password!
        </h1>
        <span className="text-sm lg:text-lg text-[#959595] font-medium">
          Fill both password fields to continue
        </span>
      </div>

      <form
        onSubmit={handleChangePass}
        className="w-full h-auto mt-0 lg:mt-8 mb-4 flex flex-col  justify-start items-start"
      >
        {formError && <FormError />}
        <div className="w-full h-auto flex flex-col gap-[2px]">
          <AuthInput
            text={"Password"}
            icon={<MdOutlineLock />}
            state={password}
            setState={setPassword}
            type={"password"}
            error={passError}
          />
          {passError && (
            <label className="ml-3 text-xs font-medium capitalize text-red-500">
              {passError}
            </label>
          )}
        </div>

        <div className="w-full h-auto flex flex-col gap-[2px]">
          <AuthInput
            text={"Re-enter Password"}
            icon={<MdOutlineLock />}
            state={reEnterPass}
            setState={setReEnterPass}
            type={"password"}
            error={rePassError}
          />
          {rePassError && (
            <label className="ml-3 text-xs font-medium capitalize text-red-500">
              {rePassError}
            </label>
          )}
        </div>

        <AuthButton text={"Save"} loading={loading} />
      </form>
    </div>
  );
};

export default ChangePassword;
