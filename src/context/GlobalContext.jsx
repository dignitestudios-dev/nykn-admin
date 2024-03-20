import Cookies from "js-cookie";
import React, { createContext, useState, useRef } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Timer Code
  const [isTimerOn, setIsTimerOn] = useState(false);
  const startTimer = () => {
    setIsTimerOn(true);
  };

  const resetTimer = () => {
    localStorage.removeItem("timerTimeRemaining");
    localStorage.removeItem("isTimerOn");
    setIsTimerOn(false);
  };

  // Profile states:
  const [profile, setProfile] = useState([]);
  const [profileLoading, setProfileLoading] = useState(false);

  // API Base Url's
  const baseUrl = "http://localhost:3000/api";
  // const baseUrl = "https://backend.nowyouknownashville.com/api";
  const imageUrl = "https://erdum.supertec.com/storage/";

  // Sidebar link toggle
  const [activeLink, setActiveLink] = useState("Discover");
  const navigateToLink = (link, name) => {
    navigate(link);
    setActiveLink(name);
  };

  // Global states for error handling:
  const [formError, setFormError] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [sidebarActive, setSidebarActive] = useState(true);

  // Theme Toggle
  const [theme, setTheme] = useState("light");
  const [palette, setPalette] = useState({
    brand: "#407BA7",
    background: "#fff",
    dark_contrast_background: "#F5F5F5",
    light_contrast_background: "#F9F9F9",
    color: "#0E0E0E",
    dark_contrast_color: "#1C1C1C",
    light_contrast_color: "#808080",
  });

  useEffect(() => {
    if (theme == "dark") {
      setPalette({
        brand: "#407BA7",
        background: "#000",
        dark_contrast_background: "#1c1c1c",
        light_contrast_background: "#323232",
        color: "#fff",
        dark_contrast_color: "#e0e0e0",
        light_contrast_color: "#959595",
      });
    } else {
      setPalette({
        brand: "#407BA7",
        background: "#fff",
        dark_contrast_background: "#F5F5F5",
        light_contrast_background: "#F9F9F9",
        color: "#0E0E0E",
        dark_contrast_color: "#1C1C1C",
        light_contrast_color: "#808080",
      });
    }
  }, [theme]);

  // Category and Label Modal Container
  const categoryAddRef = useRef(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const labelAddRef = useRef(null);
  const [isLabelOpen, setIsLabelOpen] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        // Global variables
        baseUrl,
        imageUrl,
        activeLink,
        setActiveLink,
        navigateToLink,

        // Error State
        formError,
        setFormError,
        error,
        setError,
        success,
        setSuccess,
        emailError,
        setEmailError,
        passwordError,
        setPasswordError,
        // Theme
        palette,
        theme,
        setTheme,
        // Modal togglers
        sidebarActive,
        setSidebarActive,
        // Auth states
        isLoggedIn,
        setIsLoggedIn,

        // Profile States
        profile,
        setProfile,
        profileLoading,
        setProfileLoading,

        // Timer
        isTimerOn,
        setIsTimerOn,
        startTimer,
        resetTimer,

        // Category and Label Modal:
        categoryAddRef,
        isCategoryOpen,
        setIsCategoryOpen,
        labelAddRef,
        isLabelOpen,
        setIsLabelOpen,
      }}
    >
      <div>{children}</div>
    </GlobalContext.Provider>
  );
};
