import React, { useContext } from "react";
// firebase imports:
import app, {
  auth,
  googleProvider,
  appleProvider,
} from "../../firebase/firebase";
import { FaApple } from "react-icons/fa";
import { signInWithPopup } from "firebase/auth";
import { GlobalContext } from "../../context/GlobalContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";
import BtnLoader from "../global/BtnLoader";

const SocialLogins = () => {
  const { setFormError, baseUrl, palette } = useContext(GlobalContext);

  const navigate = useNavigate();

  const [googleLoading, setGoogleLoading] = useState(false);
  const [appleLoading, setAppleLoading] = useState(false);
  const [facebookLoading, setFacebookLoading] = useState(false);

  const handleAppleLogin = async () => {
    try {
      setAppleLoading(true);
      const result = await signInWithPopup(auth, appleProvider);
      console.log(auth);
      if (result) {
        const token = await result?.user?.getIdToken();
        if (token) {
          axios
            .post(`${baseUrl}/login-social`, {
              id_token: token,
            })
            .then(
              (response) => {
                // just for now
                Cookies.set("token", response?.data?.data?.token, {
                  expires: 7,
                });
                if (response?.data?.data?.token) {
                  navigate("/home/");
                }
              },
              (error) => {
                // setFormError(error?.response?.data?.error)
                if (error?.response?.data?.error == "No user found") {
                  axios
                    .post(`${baseUrl}/register-social`, {
                      id_token: token,
                    })
                    .then(
                      (response) => {
                        console.log(response);
                        if (response?.status == 201) {
                          axios
                            .post(`${baseUrl}/login-social`, {
                              id_token: token,
                            })
                            .then(
                              (response) => {
                                // just for now
                                Cookies.set(
                                  "token",
                                  response?.data?.data?.token,
                                  { expires: 7 }
                                );
                                if (response?.data?.data?.token) {
                                  navigate("/home/");
                                }
                              },
                              (error) => {
                                setAppleLoading(false);
                                setFormError(error?.response?.data?.error);
                                console.log(error);
                              }
                            );
                          if (response?.data?.data?.token) {
                            navigate("/home/");
                          }
                        }
                      },
                      (error) => {
                        setAppleLoading(false);
                        setFormError(error?.response?.data?.error);
                        console.log(error);
                      }
                    );
                }
                console.log(error);
                setAppleLoading(false);
              }
            );
        }
      }
    } catch (err) {
      setAppleLoading(false);
      console.log(err);
      setFormError("Cannot open apple signin modal.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      console.log(auth);
      if (result) {
        const token = await result?.user?.getIdToken();
        if (token) {
          axios
            .post(`${baseUrl}/login-social`, {
              id_token: token,
            })
            .then(
              (response) => {
                // just for now
                Cookies.set("token", response?.data?.data?.token, {
                  expires: 7,
                });
                if (response?.data?.data?.token) {
                  navigate("/home/");
                }
              },
              (error) => {
                // setFormError(error?.response?.data?.error)
                if (error?.response?.data?.error == "No user found") {
                  axios
                    .post(`${baseUrl}/register-social`, {
                      id_token: token,
                    })
                    .then(
                      (response) => {
                        console.log(response);
                        if (response?.status == 201) {
                          axios
                            .post(`${baseUrl}/login-social`, {
                              id_token: token,
                            })
                            .then(
                              (response) => {
                                Cookies.set(
                                  "token",
                                  response?.data?.data?.token,
                                  { expires: 7 }
                                );
                                if (response?.data?.data?.token) {
                                  navigate("/home/");
                                }
                              },
                              (error) => {
                                setGoogleLoading(false);
                                setFormError(error?.response?.data?.error);
                                console.log(error);
                              }
                            );
                          if (response?.data?.data?.token) {
                            navigate("/home/");
                          }
                        }
                      },
                      (error) => {
                        setGoogleLoading(false);
                        setFormError(error?.response?.data?.error);
                        console.log(error);
                      }
                    );
                }
                console.log(error);
                setGoogleLoading(false);
              }
            );
        }
      }
    } catch (err) {
      console.log(err);
      setGoogleLoading(false);
      setFormError("Cannot open google signin modal.");
    }
  };

  return (
    <div className="w-full h-auto flex flex-col justify-start items-center gap-4 mt-4 lg:mt-10">
      {/* Google Button */}
      <button
        onClick={handleGoogleLogin}
        disabled={googleLoading}
        className="w-full h-10 rounded-xl transition-all duration-150  px-6 flex justify-center gap-4 items-center hover:opacity-90"
        style={{
          background: palette?.dark_contrast_background,
          color: palette?.color,
        }}
      >
        {googleLoading ? (
          <BtnLoader />
        ) : (
          <>
            <img src="/google-icon.png" className="h-4 lg:h-6" />
            <span className="text-sm mx-auto font-semibold ">
              Continue with google
            </span>
          </>
        )}
      </button>

      {/* Apple Button */}
      <button
        onClick={handleAppleLogin}
        disabled={appleLoading}
        className="w-full h-10 rounded-xl  transition-all duration-150  px-6 flex justify-center gap-4 items-center hover:opacity-90"
        style={{
          background: palette?.dark_contrast_background,
          color: palette?.color,
        }}
      >
        {appleLoading ? (
          <BtnLoader />
        ) : (
          <>
            <FaApple className="text-2xl" />
            <span className="text-sm mx-auto font-semibold ">
              Continue with apple
            </span>
          </>
        )}
      </button>

      {/* Facebook Button */}
      <button
        className="w-full h-10 rounded-xl  transition-all duration-150  px-6 flex justify-center gap-4 items-center hover:opacity-90"
        disabled={facebookLoading}
        style={{
          background: palette?.dark_contrast_background,
          color: palette?.color,
        }}
      >
        {facebookLoading ? (
          <BtnLoader />
        ) : (
          <>
            <img src="/facebook-icon.png" className="h-4 lg:h-6" />
            <span className="text-sm mx-auto font-semibold ">
              Continue with facebook
            </span>
          </>
        )}
      </button>
    </div>
  );
};

export default SocialLogins;
