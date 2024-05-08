import React, { useContext, useState } from "react";
import AuthButton from "../components/auth/AuthButton";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthInput from "../components/auth/AuthInput";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineLock } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import { GlobalContext } from "../context/GlobalContext";
import FormError from "../components/global/FormError";
import Cookies from "js-cookie";
import { validateEmail } from "../utils/validators";

const ChangePasswordInternal = () => {
  const {
    formError,
    setFormError,
    emailError,
    passwordError,
    setEmailError,
    setPasswordError,
    baseUrl,
    palette,
    setSuccess,
    navigateToLink,
  } = useContext(GlobalContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // Form Input States:
  const [password, setPassword] = useState("");
  const [currentPass, setCurrentPass] = useState("");
  const [reEnterPass, setReEnterPass] = useState("");
  const [currentPassErr, setCurrentPassErr] = useState(false);

  const createUser = (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
    if (token) {
      if (currentPass == "") {
        setCurrentPassErr("Please input your current password.");
        setTimeout(() => {
          setCurrentPassErr(false);
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
      } else if (password !== reEnterPass) {
        setPasswordError("Password's doesn't match.");
        setTimeout(() => {
          setPasswordError(false);
        }, 3000);
      } else {
        setLoading(true);

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        axios
          .post(
            `${baseUrl}/auth/changePasswordAdmin`,
            {
              current_password: currentPass,
              new_password: password,
              confirm_password: reEnterPass,
            },
            { headers }
          )
          .then(
            (response) => {
              setLoading(false);
              setSuccess("Password updated Successfully.");
              navigateToLink("/discover", "Discover");
            },
            (error) => {
              setLoading(false);
              setFormError(error?.response?.data?.error);
            }
          );
      }
    } else {
      Cookies.remove("token");
      navigate("/login");
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
                  Change Password!
                </h1>
                <span
                  className="text-sm lg:text-lg  font-medium"
                  style={{
                    color: palette?.light_contrast_color,
                  }}
                >
                  Enter the below details to change password!
                </span>
              </div>

              <form
                onSubmit={createUser}
                className="w-full h-auto mt-0 lg:mt-2 mb-4 flex flex-col  justify-start items-start"
              >
                {formError && <FormError />}

                <div className="w-full h-auto flex flex-col gap-[2px]">
                  <AuthInput
                    text={"Current Password"}
                    icon={<MdOutlineLock />}
                    state={currentPass}
                    setState={setCurrentPass}
                    type={"password"}
                    error={currentPassErr}
                  />
                  {currentPassErr && (
                    <label className="ml-3 text-xs font-medium capitalize text-red-500">
                      {currentPassErr}
                    </label>
                  )}
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
                  <AuthInput
                    text={"Re Enter Password"}
                    icon={<MdOutlineLock />}
                    state={reEnterPass}
                    setState={setReEnterPass}
                    type={"password"}
                  />
                </div>
                {/* <div className="w-full h-10 flex justify-center items-center gap-1">
                  <input type="checkbox" name="adminCheck" id="admin_check" />
                  <span className="text-xs font-medium">
                    Register as an admin.
                  </span>
                </div> */}

                <AuthButton text={"Update"} loading={loading} />
              </form>
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

export default ChangePasswordInternal;
