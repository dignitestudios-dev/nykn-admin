import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { LuImagePlus } from "react-icons/lu";
import { MdClose } from "react-icons/md";

const CategoryContainer = () => {
  const { palette } = useContext(GlobalContext);
  const handleImage = () => {
    if (images.length < 5) {
      const elem = document.getElementById("cat-image-add");
      elem.click();
    } else {
      alert("You can only select 5 images");
    }
  };

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
    <div
      id="add-new-category"
      className="w-full   h-auto flex  flex-col gap-2 justify-start rounded-3xl items-center  p-4"
      style={{
        background: palette?.light_contrast_background,
        color: palette?.color,
      }}
    >
      <span className="text-2xl font-bold">Add Category</span>
      <div
        onClick={handleImage}
        className="w-full h-16 cursor-pointer rounded-xl flex flex-col gap-1 justify-center items-center"
        style={{
          background: palette?.dark_contrast_background,
          color: palette?.light_contrast_color,
        }}
      >
        <input
          id="cat-image-add"
          className="w-full hidden h-10 rounded-full text-sm  outline-none border-none px-4"
          type="file"
          accept="/image*"
          onChange={(e) => handleImageChange(e)}
        />
        <LuImagePlus className="text-xl font-medium" />
      </div>
      <div className="w-full h-auto flex flex-wrap gap-2  justify-start items-center ">
        {/* Image component */}
        {images.map((image, key) => {
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
      <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
        <input
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
          className="w-full h-32 resize-none rounded-xl text-sm  outline-none border-none py-2 px-4"
          style={{
            background: palette?.dark_contrast_background,
          }}
          type="text"
          placeholder="Category Description"
        ></textarea>
      </div>

      <button
        style={{
          background: palette?.brand,
        }}
        className="w-full h-10  transition-all duration-150 hover:opacity-90  outline-none border-none text-white text-md font-medium rounded-full"
      >
        Add Category
      </button>
    </div>
  );
};

export default CategoryContainer;
