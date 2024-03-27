import React, { useContext, useState } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import BtnLoader from "../../global/BtnLoader";

const UserCategoryCard = ({ category, updateData }) => {
  const { palette, baseUrl, setSuccess, setError } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const updateStatus = (e, status) => {
    e.preventDefault();
    const token = Cookies.get("token");
    if (token) {
      setLoading(true);

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      axios
        .post(
          `${baseUrl}/markCategoryAsFree`,
          {
            userId: id,
            categoryId: category?._id,
            status: status,
          },
          { headers }
        )
        .then(
          (response) => {
            setLoading(false);
            updateData((prev) => !prev);
            setSuccess(response?.data?.message);
          },
          (error) => {
            setLoading(false);
            setError(error?.response?.data?.error);
          }
        );
    } else {
      Cookies.remove("token");
      navigate("/login");
    }
  };

  return (
    <div
      className="w-full md:w-[49%] lg:w-[32.5%] xl:w-[24.5%] relative h-auto min-h-24 p-2  flex flex-col gap-2 justify-between items-start rounded-lg "
      style={{
        background: `${palette?.dark_contrast_background}`,
        color: palette?.dark_contrast_color,
      }}
    >
      <div className="w-full h-auto flex gap-1 md:gap-3 justify-start items-start">
        <img
          className="h-10 w-10 rounded-md"
          src={category?.category_image}
          alt=""
        />

        <div className="w-[70%] flex flex-col justify-start items-start">
          <h1 className="text-sm  font-bold ">{category?.category_title}</h1>
          <span className="text-[#9b9c9b] text-wrap text-xs font-medium">
            {category?.category_description?.slice(0, 30)}
          </span>
        </div>
      </div>

      <div className="w-full h-auto flex gap-2 justify-start items-start">
        {category?.paymentStatus == "Paid" && (
          <span className="w-full h-7 text-xs ml-auto font-medium rounded-full flex items-center justify-center bg-blue-400 text-white">
            Paid
          </span>
        )}

        {category?.status == "Unlocked" &&
          category?.paymentStatus == "Unpaid" && (
            <button
              onClick={(e) => updateStatus(e, "Locked")}
              className="w-full h-7 text-xs ml-auto font-medium rounded-full flex items-center justify-center bg-gray-700 text-white"
            >
              {loading ? <BtnLoader /> : "Lock"}
            </button>
          )}

        {category?.status == "Locked" && (
          <button
            onClick={(e) => updateStatus(e, "Unlocked")}
            className="w-full h-7 text-xs ml-auto font-medium rounded-full flex items-center justify-center bg-green-400 text-white"
          >
            {loading ? <BtnLoader /> : "Unlock"}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCategoryCard;
