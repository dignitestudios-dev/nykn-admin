import React, { useContext, useEffect, useRef, useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import axios from "axios";
import Cookies from "js-cookie";
import BtnLoader from "../../global/BtnLoader";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../context/GlobalContext";

const UpdateCategoryModal = ({
  isOpen,
  setIsOpen,
  categoryUpdateRef,
  id,
  category,
  updateData,
}) => {
  const navigate = useNavigate();
  const { palette, theme, baseUrl, setError, setSuccess } =
    useContext(GlobalContext);
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
        // updateProfile(base64String);

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
    if (!categoryUpdateRef.current.contains(e.target)) {
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
      if (image == null) {
        setError("Image not provided.");
      } else if (title.length < 4) {
        setError("Category title must contain atleast 4 alphabets.");
      } else if (isPaid == true && price == "") {
        setError("Category price cannot be left empty.");
      } else if (title == "") {
        setError("Category title cannot be left empty.");
      } else if (title.length > 40) {
        setError("Category title cannot exceed more than 40 alphabets.");
      } else {
        setLoading(true);
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        axios
          .post(
            `${baseUrl}/updateCategory`,
            {
              categoryId: id,
              category_title: title,
              category_description: description,
              category_price: isPaid ? price : 0,
              isPaid: isPaid,
              imageBase64Data: image ? image : null,
            },
            { headers }
          )
          .then(
            (response) => {
              setLoading(false);
              setSuccess("Category Updated Successfully.");
              navigate(`/categories/${id}`);
              updateData((prev) => {
                !prev;
              });
              setIsOpen(false);
            },
            (error) => {
              setError(error?.response?.data?.error);

              setLoading(false);
            }
          );
      }
    } else {
      Cookies.remove("token");
      navigate("/login");
    }
  };

  useEffect(() => {
    setImage(category?.category_image);
    setDescription(category?.category_description);
    setTitle(category?.category_title);
    setPrice(category?.category_price !== "0" ? category?.category_price : "");
    setIsPaid(category?.isPaid);
    updateData(category?.category_image);
  }, [category]);

  return (
    <div
      onClick={toggleModal}
      id="category-add-modal"
      className={`fixed transition-all duration-500 top-0 left-0  z-[1000] w-screen h-screen ${
        isOpen ? "scale-1" : "scale-0"
      } flex items-center justify-center`}
    >
      <form
        onSubmit={handleSubmit}
        ref={categoryUpdateRef}
        className="w-96 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-3xl h-auto  flex flex-col gap-2 justify-start items-center  p-4"
        style={{ background: palette?.background, color: palette?.color }}
      >
        <span className="text-2xl font-bold">Update Category</span>
        <div
          onClick={handleProfileImg}
          className="w-full h-24 bg-white border shadow border-[#eaeaea] cursor-pointer rounded-xl flex flex-col gap-1 justify-center items-center"
          style={{
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
              id="update-image"
              src={`data:image/webp;base64,${image && image}`}
              className="w-full h-full rounded-xl object-contain"
            />
          ) : category?.category_image ? (
            <img
              id="update-image"
              src={`${category?.category_image}`}
              className="w-full h-full rounded-xl object-contain"
            />
          ) : (
            <LuImagePlus className="text-xl font-medium" />
          )}
        </div>

        <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-12 rounded-full text-sm  outline-none border border-[#eaeaea] shadow px-4"
            style={{}}
            type="text"
            placeholder="Category Name"
          />
        </div>
        {isPaid && (
          <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full h-12 border border-[#eaeaea] shadow rounded-full text-sm  outline-none  px-4"
              style={{}}
              type="text"
              placeholder="Price"
            />
          </div>
        )}

        <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-32 resize-none rounded-xl text-sm  outline-none border border-[#eaeaea] shadow py-2 px-4"
            style={{}}
            type="text"
            placeholder="Category Description"
          ></textarea>
        </div>
        <div className="w-full  flex h-auto justify-start items-start gap-2">
          <div
            onClick={() => setIsPaid(false)}
            className=" cursor-pointer flex items-center "
          >
            <input
              checked={!isPaid}
              id="free"
              type="radio"
              value={false}
              onChange={() => setIsPaid(false)}
              name="audienceType"
              className="w-4 h-4  accent-blue-400  "
            />
            <label
              htmlFor="free"
              className="cursor-pointer w-full ms-1 text-md font-medium text-gray-900 rounded "
            >
              Free
            </label>
          </div>

          <div
            onClick={() => setIsPaid(true)}
            className="cursor-pointer flex items-center "
          >
            <input
              checked={isPaid}
              id="paid"
              type="radio"
              value={true}
              onChange={() => setIsPaid(true)}
              name="audienceType"
              className="w-4 h-4  accent-blue-400  "
            />
            <label
              htmlFor="paid"
              className="cursor-pointer w-full ms-1 text-md font-medium text-gray-900 rounded "
            >
              Paid
            </label>
          </div>
        </div>

        <button
          type="submit"
          style={{
            background: palette?.brand,
          }}
          className="w-full h-10 flex justify-center items-center  transition-all duration-150 hover:opacity-90  outline-none border-none text-white text-md font-medium rounded-full"
        >
          {loading ? <BtnLoader /> : "Update Category"}
        </button>
      </form>
    </div>
  );
};

export default UpdateCategoryModal;
