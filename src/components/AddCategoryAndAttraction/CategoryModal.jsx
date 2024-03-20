import React, { useContext, useRef, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { LuImagePlus } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import axios from "axios";
import BtnLoader from "../global/BtnLoader";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const CategoryModal = ({ isOpen, setIsOpen, categoryAddRef }) => {
  const navigate = useNavigate();
  const { palette, theme, baseUrl, setError } = useContext(GlobalContext);
  // Image:
  const [image, setImage] = useState(null);

  const fileInputRef = useRef(null);

  const handleProfileImg = () => {
    fileInputRef.current.click();
  };
  const handleProfileChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const base64String = await convertImageToBase64(file);
        setImage(base64String);
        updateProfile(base64String);

        // console.log(base64String)
      } catch (error) {
        console.error("Error converting image to base64:", error.message);
      }
    }
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result.split(",")[1]; // Get base64 string without data:image part
        resolve(base64String);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  const toggleModal = (e) => {
    if (!categoryAddRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isPaid, setIsPaid] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
    if (token) {
      setLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .post(
          `${baseUrl}/Addcategory`,
          {
            category_title: title,
            category_description: description,
            category_price: price,
            isPaid: isPaid,
            imageBase64Data: image,
          },
          { headers }
        )
        .then(
          (response) => {
            setLoading(false);
            setImage(null);
            setTitle("");
            setDescription("");
            setPrice("");
            setIsOpen(false);
          },
          (error) => {
            setError(error?.response?.data?.error);
            console.log(error);
            setLoading(false);
          }
        );
    } else {
      Cookies.remove("token");
      navigate("/login");
    }
  };

  return (
    <div
      onClick={toggleModal}
      id="category-add-modal"
      className={`fixed top-0 left-0 ${
        theme == "dark" ? "bg-[#fff]/[0.2]" : "bg-[#000]/[0.2]"
      }  z-[1000] w-screen h-screen ${
        isOpen ? "flex" : "hidden"
      } items-center justify-center`}
    >
      <form
        onSubmit={handleSubmit}
        ref={categoryAddRef}
        className="w-96 h-auto rounded-3xl flex flex-col gap-2 justify-start items-center  p-4"
        style={{ background: palette?.background, color: palette?.color }}
      >
        <span className="text-2xl font-bold">Add Category</span>
        <div
          onClick={handleProfileImg}
          className="w-full h-24 cursor-pointer rounded-xl flex flex-col gap-1 justify-center items-center"
          style={{
            background: palette?.dark_contrast_background,
            color: palette?.light_contrast_color,
          }}
        >
          <input
            ref={fileInputRef}
            id="cat-image-add"
            className="w-full hidden h-10 rounded-full text-sm  outline-none border-none px-4"
            type="file"
            accept="/image*"
            onChange={(e) => handleProfileChange(e)}
          />
          {image ? (
            <img
              src={`data:image/webp;base64,${image && image}`}
              className="w-full h-full rounded-xl object-scaledown"
            />
          ) : (
            <LuImagePlus className="text-xl font-medium" />
          )}
        </div>

        <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-10 rounded-full text-sm  outline-none border-none px-4"
            style={{
              background: palette?.dark_contrast_background,
            }}
            type="text"
            placeholder="Category Name"
          />
        </div>

        <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full h-10 rounded-full text-sm  outline-none border-none px-4"
            style={{
              background: palette?.dark_contrast_background,
            }}
            type="text"
            placeholder="Price"
          />
        </div>

        <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-32 resize-none rounded-xl text-sm  outline-none border-none py-2 px-4"
            style={{
              background: palette?.dark_contrast_background,
            }}
            type="text"
            placeholder="Category Description"
          ></textarea>
        </div>
        <div className="w-full  flex h-auto justify-start items-start gap-2">
          <div className="flex items-center ">
            <input
              id="free"
              type="radio"
              value={false}
              onChange={() => setIsPaid(false)}
              name="audienceType"
              className="w-4 h-4  accent-blue-400  "
            />
            <label
              htmlFor="free"
              className="w-full ms-1 text-md font-medium text-gray-900 rounded "
            >
              Free
            </label>
          </div>

          <div className="flex items-center ">
            <input
              checked
              id="paid"
              type="radio"
              value={true}
              onChange={() => setIsPaid(true)}
              name="audienceType"
              className="w-4 h-4  accent-blue-400  "
            />
            <label
              htmlFor="paid"
              className="w-full ms-1 text-md font-medium text-gray-900 rounded "
            >
              Paid
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            background: palette?.brand,
          }}
          className="w-full h-10 flex justify-center items-center  transition-all duration-150 hover:opacity-90  outline-none border-none text-white text-md font-medium rounded-full"
        >
          {loading ? <BtnLoader /> : "Add Category"}
        </button>
      </form>
    </div>
  );
};

export default CategoryModal;
