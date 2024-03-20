import React, { useEffect } from "react";
import { useContext } from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

const PasswordUpdate = () => {
  const navigate = useNavigate();
  const { palette } = useContext(GlobalContext);

  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  }, []);

  return (
    <div className="w-full h-[20rem] flex flex-col gap-4 items-center justify-center">
      <IoIosCheckmarkCircleOutline
        className="text-7xl lg:text-9xl  font-bold"
        style={{ color: palette.brand }}
      />
      <h1
        className="text-2xl lg:text-4xl font-bold "
        style={{
          color: palette?.color,
        }}
      >
        Password Updated!
      </h1>
      <p className="text-md lg:text-lg font-semibold  text-center">
        Your password has been updated successfully!
      </p>
    </div>
  );
};

export default PasswordUpdate;
