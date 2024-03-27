import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { LuImagePlus } from "react-icons/lu";
import ConfirmDeleteAttraction from "../components/Attraction/ConfirmDeleteAttraction";
import { MdClose } from "react-icons/md";
import CategoryModal from "../components/AddCategoryAndAttraction/CategoryModal";
import { Link, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import GoogleMaps from "../components/AddCategoryAndAttraction/GoogleMaps";
import BtnLoader from "../components/global/BtnLoader";

const EditAttraction = () => {
  const {
    palette,
    categoryAddRef,
    isCategoryOpen,
    setIsCategoryOpen,
    setActiveLink,
    userInput,
    setUserInput,
    longitude,
    latitude,
    setLatitude,
    setLongitude,
    baseUrl,
    setError,
    setSuccess,
  } = useContext(GlobalContext);

  const [updateData, setUpdateData] = useState(false);
  const [categories, setCategories] = useState([]);

  const getData = () => {
    const token = Cookies.get("token");

    if (token) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      axios
        .get(`${baseUrl}/GetAllCategory`, { headers })
        .then((response) => {
          setCategories(response?.data);
        })
        .catch((error) => {
          setError(error?.response?.data?.error);
        });
    } else {
      navigate("/login/");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [updateData]);

  const navigate = useNavigate();

  // Form Input States:
  const [attractionTitle, setAttractionTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [timings, setTimings] = useState(new Date());
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    // Split the input value on spaces
    const wordsArray = inputValue.split(",");
    // Update the state with the new array of words
    setLabels(wordsArray);
  };

  const updateAttraction = (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
    if (images.length < 1) {
      setError("You must add atleast one image of the attraction.");
    } else if (categoryId == "") {
      setError("You must select a category to associate attraction with it.");
    } else if (attractionTitle.length < 4) {
      setError("Attraction Title must contain atleast 4 alphaets.");
    } else if (description == "") {
      setError("Attraction description cannot be left empty.");
    } else if (description.length > 150) {
      setError(
        "Attraction description cannot contain more than 150 alphabets."
      );
    } else if (labels.length < 1) {
      setError("Attraction must contain atleast one label.");
    } else {
      if (token) {
        setLoading(true);

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        setLoading(true);
        axios
          .put(
            `${baseUrl}/UpdateSubCategory`,
            {
              subCategoryId: params.id,
              subCategory_title: attractionTitle,
              category_Id: categoryId,
              description: description,
              location: {
                type: "Point",
                coordinates: [longitude, latitude],
              },
              timings: timings,
              labels: labels,
              cover_image: images[0],
              subCategory_images: images,
            },
            { headers }
          )
          .then(
            (response) => {
              setSuccess("Attraction updated successfully.");
              navigate("/attractions");
              setActiveLink("Attractions");
              setLoading(false);
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
    }
  };

  const [attraction, setAttraction] = useState({});
  const params = useParams();

  const [attractionImages, setAttractionImages] = useState([]);
  const getAttraction = () => {
    const token = Cookies.get("token");

    if (token) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      axios
        .post(
          `${baseUrl}/SubcategoryById`,
          {
            subcategoryId: params.id,
          },
          { headers }
        )
        .then((response) => {
          setAttraction(response?.data);
        })
        .catch((error) => {
          setError(error?.response?.data?.error);
        });
    } else {
      navigate("/login/");
    }
  };

  useEffect(() => {
    getAttraction();
  }, []);

  useEffect(() => {
    setLabels(attraction?.labels);
    setAttractionTitle(attraction?.subCategory_title);
    setCategoryId(attraction?.category_Id);
    setAttractionImages(attraction?.subCategory_images);
    setTimings(attraction?.timings);
    setDescription(attraction?.description);
  }, [attraction]);

  const handleImage = () => {
    if (images.length < 5) {
      const elem = document.getElementById("attraction-image-edit");
      elem.click();
    } else {
      alert("You can only select 5 images");
    }
  };

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const promises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          const base64String = e.target.result.split(",")[1]; // Remove data:image/jpeg;base64,
          resolve(base64String);
        };

        reader.onerror = (error) => {
          reject(error);
        };

        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises)
      .then((base64Strings) => {
        setImages([...images, ...base64Strings]);
      })
      .catch((error) => {
        console.error("Error reading files:", error);
      });
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };
  return (
    <>
      <form
        onSubmit={updateAttraction}
        id="add-new-attraction"
        className="w-full   h-auto flex  flex-col gap-2 justify-start rounded-3xl items-center "
        style={{
          color: palette?.color,
        }}
      >
        <Link
          to={-1}
          style={{
            background: palette?.brand,
          }}
          className="rounded-full flex mr-auto justify-center items-center text-xs font-medium w-8 h-8 hover:opacity-90 text-white"
        >
          <IoMdArrowBack />
        </Link>
        <span className="text-2xl font-bold">Edit Attraction</span>
        <div
          onClick={handleImage}
          className="w-20 h-20 cursor-pointer rounded-xl flex flex-col gap-1 justify-center items-center"
          style={{
            background: palette?.dark_contrast_background,
            color: palette?.light_contrast_color,
          }}
        >
          <input
            id="attraction-image-edit"
            className="w-full hidden h-10 rounded-full text-sm  outline-none border-none px-4"
            type="file"
            accept="/image*"
            onChange={(e) => handleImageChange(e)}
          />
          <LuImagePlus className="text-xl font-medium" />
        </div>
        <div className="w-full h-auto flex flex-wrap gap-2  justify-start items-center ">
          {/* Image component */}
          {images?.length > 0 &&
            images.map((image, key) => {
              return (
                <div className="relative w-[23%] md:w-[13%] lg:w-20 h-20 bg-gray-200 rounded-md">
                  <img
                    src={`data:image/webp;base64,${image && image}`}
                    className="w-full h-full rounded-md object-cover"
                  />
                  <button
                    onClick={() => handleRemoveImage(key)}
                    className="w-5 h-5 rounded-full bg-blue-500 absolute top-1 right-1 flex items-center justify-center shadow-md "
                  >
                    <MdClose className="text-xs text-white" />
                  </button>
                </div>
              );
            })}
        </div>

        <div className="w-full h-auto flex  gap-1 justify-start items-start">
          <select
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-[70%] lg:w-[90%] h-10 rounded-full text-sm  outline-none border-none px-4"
            style={{
              background: palette?.dark_contrast_background,
            }}
            type="text"
            placeholder="Category"
          >
            <option value="">--Select--</option>
            {categories?.map((item) => {
              return <option value={item?._id}>{item?.category_title}</option>;
            })}
          </select>
          <button
            type="button"
            onClick={() => setIsCategoryOpen(true)}
            style={{
              background: palette?.brand,
            }}
            className="w-[30%] lg:w-[10%] h-10  transition-all duration-150 hover:opacity-90  outline-none border-none text-white text-sm font-medium rounded-full"
          >
            Add Category
          </button>
        </div>

        <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
          <input
            value={attractionTitle}
            onChange={(e) => setAttractionTitle(e.target.value)}
            className="w-full h-10 rounded-full text-sm  outline-none border-none px-4"
            style={{
              background: palette?.dark_contrast_background,
            }}
            type="text"
            placeholder="Attraction Name"
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
            placeholder="Description"
          ></textarea>
        </div>

        <div className="w-full h-auto flex gap-2 justify-start items-start">
          <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
            <input
              value={timings}
              onChange={(e) => setTimings(e.target.value)}
              className="w-full h-10 rounded-full text-sm  outline-none border-none px-4"
              style={{
                background: palette?.dark_contrast_background,
              }}
              type="datetime-local"
              placeholder="Timings"
            />
          </div>
          <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
            <input
              onChange={handleInputChange}
              className="w-full h-10 rounded-full text-sm  outline-none border-none px-4"
              style={{
                background: palette?.dark_contrast_background,
              }}
              type="text"
              placeholder="Label"
            />
            <div className="w-full h-auto flex flex-wrap gap-2  justify-start items-center ">
              {labels?.slice(0, -1)?.map((word, key) => {
                return (
                  <span
                    className="w-auto h-7 px-2 flex justify-center items-center text-[10px] rounded-full font-normal bg-blue-500 text-white"
                    key={key}
                  >
                    {word}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
          <input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="w-full h-10 rounded-full text-sm  outline-none border-none px-4"
            style={{
              background: palette?.dark_contrast_background,
            }}
            type="text"
            placeholder="Address"
          />
        </div>
        <div className="w-full h-52 flex flex-col gap-1 justify-start items-start">
          <GoogleMaps />
        </div>
        <div className="w-full mt-2 flex gap-2 justify-start items-start">
          <button
            type="submit"
            style={{
              background: palette?.brand,
            }}
            className="w-32 h-10  transition-all duration-150 hover:opacity-90  outline-none border-none text-white text-md font-medium rounded-full flex justify-center items-center"
          >
            {loading ? <BtnLoader /> : "Update"}
          </button>
          <button
            type="button"
            onClick={() => setIsDeleteOpen(true)}
            className="w-32 h-10 bg-red-500  transition-all duration-150 hover:opacity-90  outline-none border-none text-white text-md font-medium rounded-full"
          >
            Delete
          </button>
        </div>
      </form>
      {/* Category Add Modal */}
      <CategoryModal
        isOpen={isCategoryOpen}
        setIsOpen={setIsCategoryOpen}
        categoryAddRef={categoryAddRef}
        updateData={setUpdateData}
      />

      <ConfirmDeleteAttraction
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        id={params?.id}
      />
    </>
  );
};

export default EditAttraction;
