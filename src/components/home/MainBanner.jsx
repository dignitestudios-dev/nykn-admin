import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Link } from "react-router-dom";

const MainBanner = () => {
  const { palette, profile } = useContext(GlobalContext);

  return (
    <div className="pt-10  w-full lg:w-[48.5%] xl:w-[55%] ">
      <div
        style={{
          background: palette?.dark_contrast_background,
          color: palette?.dark_contrast_color,
          borderBottom: `2px solid ${palette?.dark_contrast_background}`,
        }}
        className="w-full shadow min-h-40 h-auto md:h-40 p-5 rounded-md flex gap-2 justify-start items-center "
      >
        <div className="w-[70%] h-full flex flex-col gap-4 justify-center items-start">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl">Congratulations {profile?.name} 🎉</h1>
            <p
              className="text-xs font-medium"
              style={{
                color: palette?.light_contrast_color,
              }}
            >
              200 new users registered on the app.
              <br />
              Checkout the newly onboarded users and their statistics.
            </p>
          </div>
          <Link
            to="/users/"
            className="w-32 h-8 text-sm hover:opacity-85 font-medium text-white rounded-md flex items-center justify-center"
            style={{
              background: palette?.brand,
            }}
          >
            Visit Users
          </Link>
        </div>
        <div className="w-[30%]  h-full flex items-end justify-center relative">
          <span className="w-32 h-32 rounded-full bg-[#407BA7]/[0.2] absolute md:top-2  md:right-5"></span>

          <img src="/banner.png" className=" h-52 z-10" />
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
