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
import LabelModal from "../components/AddCategoryAndAttraction/LabelModal";
import { CiImageOn } from "react-icons/ci";
import { ImCancelCircle } from "react-icons/im";

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
    isLabelOpen,
    setIsLabelOpen,
    labelAddRef,
  } = useContext(GlobalContext);

  const [updateData, setUpdateData] = useState(false);
  const [categories, setCategories] = useState([]);
  const [responseLabels, setResponseLabels] = useState([]);

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
          setCategories(response?.data?.categories);
          setResponseLabels(
            response?.data?.allLabels[0]?.labels
              ? response?.data?.allLabels[0]?.labels
              : []
          );
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
  const [price, setPrice] = useState("");
  const [fromDay, setFromDay] = useState("");
  const [toDay, setToDay] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");

  const handleInputChange = (name) => {
    if (!labels.includes(name)) {
      setLabels((prevLabels) => [...prevLabels, name]);
    }
  };
  const handleLabelDelete = (labelToRemove) => {
    setLabels((prevLabels) =>
      prevLabels.filter((label) => label !== labelToRemove)
    );
  };

  const [selectedDays, setSelectedDays] = useState([]);
  const [daysOfWeek, setDaysOfWeek] = useState([
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]);

  function isValidTime(time) {
    if (!time) return false;
    const [hours, minutes] = time.split(":");
    return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
  }

  function convertTimeTo12HourFormat(time) {
    if (isValidTime(time)) {
      const [hours, minutes] = time.split(":");
      const isPM = parseInt(hours) >= 12;
      let convertedHours = ((parseInt(hours) + 11) % 12) + 1;
      convertedHours =
        convertedHours < 10 ? "0" + convertedHours : convertedHours;
      return `${convertedHours}:${minutes} ${isPM ? "PM" : "AM"}`;
    } else if (time) {
      return `${time}`;
    } else {
      return ``;
    }
  }
  const isInputValid = (input) => {
    const regex = /^[0-9]+(\.[0-9]+)?$/;
    return regex.test(input);
  };

  const updateAttraction = (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
    if (categoryId == "") {
      setError("You must select a category to associate attraction with it.");
    } else if (!isInputValid(price)) {
      setError("Price must be a number not an alphabet.");
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
              category_Id: categoryId?.id,
              description: description,
              location: {
                type: "Point",
                coordinates: [longitude, latitude],
              },
              fromDay: fromDay,
              toDay: toDay,
              fromTime: convertTimeTo12HourFormat(fromTime),
              toTime: convertTimeTo12HourFormat(toTime),
              address: userInput,
              labels: labels,
              cover_image: images?.length > 0 ? images[0] : null,
              subCategory_images: images?.length > 0 ? images : null,
            },
            { headers }
          )
          .then(
            (response) => {
              setSuccess("Attraction updated successfully.");
              navigate("/attractions");
              setActiveLink("Attractions");
              setUserInput("");
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
          setAttraction(response?.data?.subcategory);
          setCategoryId({ id: "", title: response?.data?.category_title });
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

    setAttractionImages(attraction?.subCategory_images);
    setTimings(attraction?.timings);
    setDescription(attraction?.description);
    setPrice(attraction?.price);
    setFromDay(attraction?.fromDay);
    setToDay(attraction?.toDay);
    setFromTime(attraction?.fromTime);
    setToTime(attraction?.toTime);
    setUserInput(attraction?.address);
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
        className="w-full   h-auto flex  flex-col gap-4 justify-start rounded-3xl items-start "
        style={{
          color: palette?.color,
        }}
      >
        <Link
          to={-1}
          style={{
            background: palette?.brand,
          }}
          className="rounded-full flex mr-auto justify-center items-center text-xs font-medium w-10 h-10 hover:opacity-90 text-white"
        >
          <IoMdArrowBack />
        </Link>
        <span className="text-3xl font-bold">Edit Attraction</span>
        <div className="w-full flex flex-col bg-white border shadow border-[#eaeaea] rounded-xl gap-2 justify-start items-start p-5">
          <div
            onClick={handleImage}
            className="w-full h-28 cursor-pointer  flex flex-col gap-1 justify-center items-center"
            style={{
              color: palette?.light_contrast_color,
            }}
          >
            <input
              id="attraction-image-edit"
              className="w-full hidden h-10 rounded-full text-sm  outline-none border-none px-4"
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => handleImageChange(e)}
            />
            <div className="w-auto flex flex-col gap-2 justify-center items-center">
              <LuImagePlus className="text-3xl font-medium" />
              <span className="text-xs font-medium text-gray-600">
                Please provide the Image in jpg or png format.
              </span>
            </div>
          </div>
          <span className="w-full border-b-2 border-dashed border-[#eaeaea]"></span>

          <div className="w-full h-auto flex flex-wrap gap-2  justify-start items-center ">
            {/* Image component */}
            {images.map((image, key) => {
              return (
                <div className="relative w-[23%] md:w-[13%] lg:w-20 h-20 bg-white flex justify-center items-center border-[2px] border-[#eaeaea] p-2 rounded-md">
                  <img
                    src={`data:image/webp;base64,${image && image}`}
                    className="w-full h-full rounded-md object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(key)}
                    className="w-5 h-5 rounded-full  absolute top-1 right-1 flex items-center justify-center shadow-md "
                    style={{ background: palette?.brand }}
                  >
                    <MdClose className="text-xs text-white" />
                  </button>
                </div>
              );
            })}
            {images?.length < 1 && attractionImages?.length < 1 ? (
              <div className="relative w-[23%] md:w-[13%] lg:w-20 h-20 bg-white flex justify-center items-center border-[2px] border-[#eaeaea] rounded-md">
                <CiImageOn className="text-3xl text-[#7c7c7c]" />
              </div>
            ) : (
              <></>
            )}

            {attractionImages?.length > 0 &&
              attractionImages.map((image, key) => {
                return (
                  <div className="relative w-[23%] md:w-[13%] lg:w-20 h-20 bg-white flex justify-center items-center border-[2px] border-[#eaeaea] p-2 rounded-md">
                    <img
                      src={`${image && image}`}
                      className="w-full h-full rounded-md object-cover"
                    />
                    <button
                      style={{ background: palette?.brand }}
                      onClick={() => handleRemoveImage(key)}
                      className="w-5 h-5 rounded-full  absolute top-1 right-1 flex items-center justify-center shadow-md "
                    >
                      <MdClose className="text-xs text-white" />
                    </button>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="w-full h-auto flex  gap-1 justify-start items-start">
          <div className="w-[70%] lg:w-[90%] flex flex-col justify-start items-start gap-2">
            <div
              onClick={() => {
                document
                  .getElementById("category_container")
                  .classList.toggle("hidden");
              }}
              className="cursor-pointer w-full h-12 shadow text-[#7c7c7c] rounded-full flex justify-start items-center text-sm  outline-none border px-4"
              type="text"
              placeholder="Category"
            >
              <span>
                {categoryId?.title ? categoryId?.title : "--Select--"}
              </span>
            </div>
            <div
              id="category_container"
              className="w-full hidden transition-all grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 duration-500 p-4 bg-white min-h-auto max-h-60 overflow-y-auto  shadow border border-[#eaeaea] rounded-2xl"
            >
              {categories?.map((item) => {
                return (
                  <div
                    className="w-full h-12  bg-white border border-[#eaeaea] shadow flex justify-start items-center px-4 hover:bg-[#407BA7] hover:text-white cursor-pointer rounded-full"
                    onClick={() => {
                      setCategoryId({
                        id: item?._id,
                        title: item?.category_title,
                      });
                      document
                        .getElementById("category_container")
                        .classList.toggle("hidden");
                    }}
                  >
                    {item?.category_title}
                  </div>
                );
              })}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsCategoryOpen(true)}
            style={{
              background: palette?.brand,
            }}
            className="w-[30%] lg:w-[10%] h-12  transition-all duration-150 hover:opacity-90  outline-none border-none text-white text-sm font-medium rounded-full"
          >
            Add Category
          </button>
        </div>

        <div className="w-full h-auto grid grid-cols-2 gap-1 justify-start items-start">
          <input
            value={attractionTitle}
            onChange={(e) => setAttractionTitle(e.target.value)}
            className="w-full h-12 bg-white border border-[#eaeaea] shadow rounded-full text-sm  outline-none px-4"
            type="text"
            placeholder="Attraction Name"
          />
          <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full h-12 bg-white border border-[#eaeaea] shadow rounded-full text-sm  outline-none px-4"
              type="text"
              placeholder="Price"
            />
          </div>
        </div>

        <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-32 resize-none rounded-xl text-sm  outline-none bg-white border border-[#eaeaea] shadow py-2 px-4"
            type="text"
            placeholder="Description"
          ></textarea>
        </div>

        <div className="w-full h-auto flex gap-2 justify-start items-start">
          <div className="w-full h-auto flex  gap-2 justify-start items-start">
            <div className="w-1/2 flex flex-col justify-start items-start gap-1">
              <label className="text-sm font-medium text-black ml-2">
                From Time{" "}
                <span>
                  ({fromTime !== "" && convertTimeTo12HourFormat(fromTime)})
                </span>
              </label>
              <input
                value={fromTime}
                onChange={(e) => setFromTime(e.target.value)}
                className="w-full h-12 bg-white border border-[#eaeaea] shadow rounded-full text-sm  outline-none  px-4"
                type="time"
                placeholder="Timings"
              />
            </div>
            <div className="w-1/2 flex flex-col justify-start items-start gap-1">
              <label className="text-sm font-medium text-black ml-2">
                To Time{" "}
                <span>
                  ({toTime !== "" && convertTimeTo12HourFormat(toTime)})
                </span>
              </label>
              <input
                value={toTime}
                onChange={(e) => setToTime(e.target.value)}
                className="w-full h-12 bg-white border border-[#eaeaea] shadow rounded-full text-sm  outline-none px-4"
                type="time"
                placeholder="Timings"
              />
            </div>
          </div>
        </div>

        <div className="w-full flex justify-start items-start gap-2">
          <div className="w-1/2 flex flex-col justify-start items-start gap-2">
            <div
              onClick={() => {
                document
                  .getElementById("fromTime_container")
                  .classList.toggle("hidden");
              }}
              className="cursor-pointer w-full h-12 shadow text-[#7c7c7c] rounded-full flex justify-start items-center text-sm  outline-none border px-4"
              type="text"
              placeholder="Category"
            >
              <span>{fromDay == "" ? "--From Day--" : fromDay}</span>
            </div>
            <div
              id="fromTime_container"
              className="w-full hidden transition-all grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 duration-500 p-4 bg-white min-h-auto max-h-60 overflow-y-auto  shadow border border-[#eaeaea] rounded-2xl"
            >
              {daysOfWeek?.map((item) => {
                return (
                  <div
                    className="w-full h-12  bg-white border border-[#eaeaea] shadow flex justify-start items-center px-4 hover:bg-[#407BA7] hover:text-white cursor-pointer rounded-full"
                    onClick={() => {
                      setFromDay(item);
                      document
                        .getElementById("fromTime_container")
                        .classList.toggle("hidden");
                    }}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-1/2 flex flex-col justify-start items-start gap-2">
            <div
              onClick={() => {
                document
                  .getElementById("toTime_container")
                  .classList.toggle("hidden");
              }}
              className="cursor-pointer w-full h-12 shadow text-[#7c7c7c] rounded-full flex justify-start items-center text-sm  outline-none border px-4"
              type="text"
              placeholder="Category"
            >
              <span>{toDay == "" ? "--To Day--" : toDay}</span>
            </div>
            <div
              id="toTime_container"
              className="w-full hidden transition-all grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 duration-500 p-4 bg-white min-h-auto max-h-60 overflow-y-auto  shadow border border-[#eaeaea] rounded-2xl"
            >
              {daysOfWeek?.map((item) => {
                return (
                  <div
                    className="w-full h-12  bg-white border border-[#eaeaea] shadow flex justify-start items-center px-4 hover:bg-[#407BA7] hover:text-white cursor-pointer rounded-full"
                    onClick={() => {
                      setToDay(item);
                      document
                        .getElementById("toTime_container")
                        .classList.toggle("hidden");
                    }}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col justify-start items-start gap-1">
          <div className="w-full h-auto flex  gap-1 justify-start items-start">
            <div className="w-[70%] lg:w-[90%] flex flex-col justify-start items-start gap-2">
              <div
                onClick={() => {
                  document
                    .getElementById("labels_container")
                    .classList.toggle("hidden");
                }}
                className="cursor-pointer w-full h-12 shadow text-[#7c7c7c] rounded-full flex justify-start items-center text-sm  outline-none border px-4"
                type="text"
                placeholder="Category"
              >
                <span>{"--Select--"}</span>
              </div>
              <div
                id="labels_container"
                className="w-full hidden transition-all grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 duration-500 p-4 bg-white min-h-auto max-h-60 overflow-y-auto  shadow border border-[#eaeaea] rounded-2xl"
              >
                {responseLabels?.map((item) => {
                  return (
                    <div
                      className="w-full h-12  bg-white border border-[#eaeaea] shadow flex justify-start items-center px-4 hover:bg-[#407BA7] hover:text-white cursor-pointer rounded-full"
                      onClick={() => {
                        handleInputChange(item?.name);
                        document
                          .getElementById("labels_container")
                          .classList.toggle("hidden");
                      }}
                    >
                      {item?.name}
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsLabelOpen(true)}
              style={{
                background: palette?.brand,
              }}
              className="w-[30%] lg:w-[10%] h-12  transition-all duration-150 hover:opacity-90  outline-none border-none text-white text-sm font-medium rounded-full"
            >
              Add Label
            </button>
          </div>
          <div className="w-full flex justify-start items-start gap-2">
            {labels?.map((word, key) => {
              return (
                <div
                  key={key}
                  className="flex justify-center items-center gap-1 px-2 rounded-full"
                  style={{ background: palette?.brand }}
                >
                  <span
                    className="w-auto h-9 px-2 flex justify-center gap-3 items-center text-[10px] rounded-full font-normal  text-white"
                    key={key}
                  >
                    {word}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleLabelDelete(word)}
                    className="text-white text-sm"
                  >
                    <ImCancelCircle />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Label Modal */}
        <LabelModal
          isOpen={isLabelOpen}
          setIsOpen={setIsLabelOpen}
          labelAddRef={labelAddRef}
          updateData={setUpdateData}
        />

        <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
          <input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="w-full h-12 rounded-full text-sm  outline-none border border-[#eaeaea] bg-white shadow px-4"
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
            className="w-32 h-12  transition-all duration-150 hover:opacity-90  outline-none border-none text-white text-md font-medium rounded-full flex justify-center items-center"
          >
            {loading ? <BtnLoader /> : "Update"}
          </button>
          <button
            type="button"
            onClick={() => setIsDeleteOpen(true)}
            className="w-32 h-12 bg-red-500  transition-all duration-150 hover:opacity-90  outline-none border-none text-white text-md font-medium rounded-full"
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
