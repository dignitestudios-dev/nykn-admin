import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { LuImagePlus } from "react-icons/lu";

const CategoryAndAttractionCreation = () => {
  const { palette } = useContext(GlobalContext);
  const handleImage = () => {
    const elem = document.getElementById("cat-image-update");
    elem.click();
  };

  return (
    <div className="w-full h-auto p-0 md:p-2 lg:p-4  flex flex-col lg:flex-row gap-4 justify-start items-start">
      <div className="w-full lg:w-1/2 flex flex-col justify-start items-start gap-4">
        {/* Category Creation */}
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
              id="cat-image-update"
              className="w-full hidden h-10 rounded-full text-sm  outline-none border-none px-4"
              type="file"
              accept="/*png"
            />
            <LuImagePlus className="text-xl font-medium" />
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

        {/* Label Creation */}

        <div
          id="add-new-label"
          className="w-full  h-auto flex  flex-col gap-2 justify-start rounded-3xl items-center  p-4"
          style={{
            background: palette?.light_contrast_background,
            color: palette?.color,
          }}
        >
          <span className="text-2xl font-bold">Add Label</span>

          <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
            <input
              className="w-full h-10 rounded-full text-sm  outline-none border-none px-4"
              style={{
                background: palette?.dark_contrast_background,
              }}
              type="text"
              placeholder="Label"
            />
          </div>

          <button
            style={{
              background: palette?.brand,
            }}
            className="w-full h-10  transition-all duration-150 hover:opacity-90  outline-none border-none text-white text-md font-medium rounded-full"
          >
            Add Label
          </button>
        </div>
      </div>

      <div
        id="add-new-attraction"
        className="w-full lg:w-1/2  h-auto flex  flex-col gap-2 justify-start rounded-3xl items-center  p-4"
        style={{
          background: palette?.light_contrast_background,
          color: palette?.color,
        }}
      >
        <span className="text-2xl font-bold">Add Attraction</span>
        <div
          onClick={handleImage}
          className="w-full h-16 cursor-pointer rounded-xl flex flex-col gap-1 justify-center items-center"
          style={{
            background: palette?.dark_contrast_background,
            color: palette?.light_contrast_color,
          }}
        >
          <input
            id="cat-image-update"
            className="w-full hidden h-10 rounded-full text-sm  outline-none border-none px-4"
            type="file"
            accept="/*png"
          />
          <LuImagePlus className="text-xl font-medium" />
        </div>

        <div className="w-full h-auto flex  gap-1 justify-start items-start">
          <select
            className="w-full h-10 rounded-full text-sm  outline-none border-none px-4"
            style={{
              background: palette?.dark_contrast_background,
            }}
            type="text"
            placeholder="Category"
          >
            <option value="">Select Category</option>
          </select>
        </div>

        <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
          <input
            className="w-full h-10 rounded-full text-sm  outline-none border-none px-4"
            style={{
              background: palette?.dark_contrast_background,
            }}
            type="text"
            placeholder="Attraction Name"
          />
        </div>

        <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
          <input
            className="w-full h-10 rounded-full text-sm  outline-none border-none px-4"
            style={{
              background: palette?.dark_contrast_background,
            }}
            type="text"
            placeholder="Title"
          />
        </div>

        <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
          <textarea
            className="w-full h-32 resize-none rounded-xl text-sm  outline-none border-none py-2 px-4"
            style={{
              background: palette?.dark_contrast_background,
            }}
            type="text"
            placeholder="Story"
          ></textarea>
        </div>

        <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
          <input
            className="w-full h-10 rounded-full text-sm  outline-none border-none px-4"
            style={{
              background: palette?.dark_contrast_background,
            }}
            type="text"
            placeholder="Timings"
          />
        </div>
        <div className="w-full h-auto flex  gap-1 justify-start items-start">
          <select
            className="w-full h-10 rounded-full text-sm  outline-none border-none px-4"
            style={{
              background: palette?.dark_contrast_background,
            }}
            type="text"
            placeholder="Label"
          >
            <option value="">Select Label</option>
          </select>
        </div>

        <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
          <input
            className="w-full h-10 rounded-full text-sm  outline-none border-none px-4"
            style={{
              background: palette?.dark_contrast_background,
            }}
            type="text"
            placeholder="Address"
          />
        </div>
        <div className="w-full h-52 flex flex-col gap-1 justify-start items-start">
          <img
            src="https://media.istockphoto.com/id/1405859427/vector/geographic-regions-of-the-united-states-of-america-political-map.jpg?s=612x612&w=0&k=20&c=O52Q5ryJWJEhlts8zPoH1xo3UU51A5n2HaqVd5mSCZg="
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>

        <button
          style={{
            background: palette?.brand,
          }}
          className="w-full h-10  transition-all duration-150 hover:opacity-90  outline-none border-none text-white text-md font-medium rounded-full"
        >
          Add Attraction
        </button>
      </div>
    </div>
  );
};

export default CategoryAndAttractionCreation;
