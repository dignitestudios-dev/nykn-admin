import React, { useContext, useState, useEffect, useRef } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import UpdateCategoryModal from "./UpdateCategoryModal";
import ConfirmCategoryDeleteModal from "./ConfirmCategoryDeleteModal";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

const CategoryDetailHeader = () => {
  const { id } = useParams();
  const { palette, baseUrl, setError } = useContext(GlobalContext);
  const [isCategoryUpdateOpen, setIsCategoryUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const [updateData, setUpdateData] = useState(false);
  const categoryUpdateRef = useRef();

  const getData = () => {
    const token = Cookies.get("token");

    if (token) {
      setLoading(true);

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      axios
        .post(
          `${baseUrl}/getCategoryById
        `,
          { categoryId: id },
          { headers }
        )
        .then((response) => {
          setResponse(response?.data["category"]);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);

          setError(error?.response?.data?.error);
        });
    } else {
      setLoading(false);
      navigate("/login/");
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const [image, setImage] = useState(false);

  useEffect(() => {
    getData();
  }, [updateData]);
  useEffect(() => {
    setImage(response?.category_image);
  }, [response]);

  return (
    <div className="w-full bg-white shadow border border-[#eaeaea] h-auto flex flex-col justify-start items-center p-3 rounded-full gap-3 ">
      <div className="w-full h-auto flex justify-start items-center gap-3">
        <span
          className="rounded-full w-16 h-16 p-1 flex justify-center items-center"
          style={{
            background: palette?.brand,
          }}
        >
          <img
            className="h-full w-full rounded-full"
            src={image ? image : response?.category_image}
            alt=""
          />
        </span>

        <div className="w-[70%] flex flex-col justify-start items-start">
          <h1
            className="text-xl  font-extrabold "
            style={{
              color: palette?.color,
            }}
          >
            {response?.category_title}
          </h1>
          <span className="text-[#9b9c9b] text-wrap text-sm font-medium">
            {response?.category_description}
          </span>
          {response?.isPaid && (
            <div className="flex text-sm justify-start items-start">
              <span className="font-bold" style={{ color: palette?.brand }}>
                $
              </span>
              <span className="font-bold" style={{ color: palette?.color }}>
                {response?.category_price}
              </span>
            </div>
          )}
        </div>

        <div className="w-auto h-full flex  ml-auto justify-start items-end gap-2">
          <button
            onClick={() => setIsCategoryUpdateOpen(true)}
            className="w-20 h-10 text-xs font-medium rounded-full flex items-center justify-center text-white"
            style={{
              background: palette?.brand,
            }}
          >
            Edit
          </button>
        </div>
        <UpdateCategoryModal
          isOpen={isCategoryUpdateOpen}
          setIsOpen={setIsCategoryUpdateOpen}
          categoryUpdateRef={categoryUpdateRef}
          updateData={setUpdateData}
          id={id}
          category={response}
        />
      </div>
    </div>
  );
};

export default CategoryDetailHeader;
