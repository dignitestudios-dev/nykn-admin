import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      const icon = document.getElementById("splash-animate-icon");
      icon.classList.add("rotate-45");
    }, 400);
    setTimeout(() => {
      const icon = document.getElementById("splash-animate-icon");
      icon.classList.add("translate-x-[60vw]");
    }, 800);

    setTimeout(() => {
      const icon = document.getElementById("splash-animate-logo");
      icon.classList.remove("translate-x-[100vw]");
      icon.classList.add("translate-x-1/2");
    }, 1200);

    setTimeout(() => {
      navigate("/login");
    }, 1400);
  }, []);

  const { palette } = useContext(GlobalContext);

  return (
    <div
      className={`w-full h-screen flex justify-center items-center `}
      style={{
        background: palette?.background,
      }}
    >
      <img
        src="logo.svg"
        className="fixed top-[45%] left-0 h-16 translate-x-[100vw] z-50"
        id="splash-animate-logo"
      />
      <img
        src="/rentalbay-icon.png"
        id="splash-animate-icon"
        className="transition-all fixed top-[45%] left-[45%] duration-200"
      />
    </div>
  );
};

export default Splash;
