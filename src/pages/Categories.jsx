import React, { useContext, useState } from "react";
import CategoryCard from "../components/Categories/CategoryCard";
import { IoSearch } from "react-icons/io5";
import { GlobalContext } from "../context/GlobalContext";
import { CiFilter } from "react-icons/ci";
import { GoSortDesc } from "react-icons/go";
import CategoryModal from "../components/AddCategoryAndAttraction/CategoryModal";

const Categories = () => {
  const arr = [
    {
      id: 1,
      name: "Category Name",
      description: "Category Description goes here",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      status: "free",
    },
    {
      id: 2,
      name: "Category Name",
      description: "Category Description goes here",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      status: "paid",
    },
    {
      id: 3,
      name: "Category Name",
      description: "Category Description goes here",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      status: "free",
    },
    {
      id: 4,
      name: "Category Name",
      description: "Category Description goes here",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      status: "paid",
    },
    {
      id: 1,
      name: "Category Name",
      description: "Category Description goes here",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      status: "free",
    },
    {
      id: 1,
      name: "Category Name",
      description: "Category Description goes here",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      status: "paid",
    },
    {
      id: 1,
      name: "Category Name",
      description: "Category Description goes here",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      status: "free",
    },
    {
      id: 1,
      name: "Category Name",
      description: "Category Description goes here",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      status: "paid",
    },
    {
      id: 1,
      name: "Category Name",
      description: "Category Description goes here",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      status: "paid",
    },
    {
      id: 1,
      name: "Category Name",
      description: "Category Description goes here",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      status: "paid",
    },
    {
      id: 1,
      name: "Category Name",
      description: "Category Description goes here",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      status: "paid",
    },
    {
      id: 1,
      name: "Category Name",
      description: "Category Description goes here",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      status: "paid",
    },
  ];

  const { palette, theme, isCategoryOpen, categoryAddRef, setIsCategoryOpen } =
    useContext(GlobalContext);

  const [filter, setFilter] = useState("filter");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="w-full flex h-auto flex-wrap justify-start items-start gap-2">
      <div className="w-full my-3 flex justify-between items-center px-2">
        <h1
          className="text-2xl font-bold"
          style={{
            color: palette?.brand,
          }}
        >
          Categories
        </h1>
        <button
          onClick={() => setIsCategoryOpen(true)}
          style={{
            background: palette?.brand,
          }}
          className="w-32 h-8  transition-all duration-150 hover:opacity-90  outline-none border-none text-white text-xs font-medium rounded-full"
        >
          Add Category
        </button>
      </div>

      {/* Category Add Modal */}
      <CategoryModal
        isOpen={isCategoryOpen}
        setIsOpen={setIsCategoryOpen}
        categoryAddRef={categoryAddRef}
      />

      <div className="w-full flex justify-start items-start gap-2">
        <div className="relative w-[70%] lg:w-[90%]">
          <input
            type="text"
            className="w-full h-10 rounded-full outline-none border-none px-4 text-sm"
            placeholder="Search"
            style={{
              background: palette?.dark_contrast_background,
              color: palette?.color,
            }}
          />
          <button
            className="w-8 h-8 rounded-full flex items-center justify-center absolute top-1 right-1 "
            style={{ background: palette?.brand, color: palette?.color }}
          >
            <IoSearch className="text-white" />
          </button>
        </div>
        <div className="w-[30%] lg:w-[10%] relative">
          <button
            onClick={() => setIsFilterOpen((prev) => !prev)}
            className="w-full h-10 rounded-full text-sm pl-3 pr-1 flex justify-between items-center font-medium capitalize"
            style={{
              background: palette?.dark_contrast_background,
              color: palette?.color,
            }}
          >
            {filter}
            <span
              style={{
                background: palette?.brand,
              }}
              className="w-8 h-8 text-white rounded-full flex items-center justify-center"
            >
              <CiFilter />
            </span>
          </button>
          {isFilterOpen && (
            <div
              className="w-full h-auto flex flex-col justify-start items-start gap-2 shadow-md absolute top-12 p-2 rounded-3xl"
              style={{
                background: palette?.dark_contrast_background,
                boxShadow: `${
                  theme == "dark" ? "#1e1e1e" : "rgba(99, 99, 99, 0.2)"
                } 0px 2px 8px 0px`,
              }}
            >
              <button
                onClick={() => {
                  setFilter("paid");
                  setIsFilterOpen(false);
                }}
                className="w-full h-10 hover:opacity-90 rounded-full text-sm px-3 flex justify-between items-center font-medium capitalize"
                style={{
                  background: palette?.light_contrast_background,
                  color: palette?.color,
                }}
              >
                Paid
              </button>
              <button
                onClick={() => {
                  setFilter("free");
                  setIsFilterOpen(false);
                }}
                className="w-full h-10 hover:opacity-90 rounded-full text-sm px-3 flex justify-between items-center font-medium capitalize"
                style={{
                  background: palette?.light_contrast_background,
                  color: palette?.color,
                }}
              >
                Free
              </button>
            </div>
          )}
        </div>
      </div>

      {arr?.map((item) => {
        return <CategoryCard category={item} key={item} />;
      })}
    </div>
  );
};

export default Categories;
