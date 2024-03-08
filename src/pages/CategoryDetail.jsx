import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CategoryDetailHeader from "../components/Categories/CategoryDetails/CategoryDetailHeader";
import { GlobalContext } from "../context/GlobalContext";
import CategoryCard from "../components/Categories/CategoryCard";
import AttractionCard from "../components/Categories/CategoryDetails/AttractionCard";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { GoSortDesc } from "react-icons/go";
import { CiFilter } from "react-icons/ci";
import { IoMdArrowBack } from "react-icons/io";

const CategoryDetail = () => {
  const { id } = useParams();
  const { palette, theme } = useContext(GlobalContext);
  const arr = [
    {
      id: 1,
      name: "Attraction Name",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker incl",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      status: "free",
    },
    {
      id: 2,
      name: "Attraction Name",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker incl",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      status: "paid",
    },
    {
      id: 3,
      name: "Attraction Name",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker incl",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      status: "free",
    },
    {
      id: 4,
      name: "Attraction Name",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker incl",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      status: "paid",
    },
    {
      id: 1,
      name: "Attraction Name",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker incl",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      status: "free",
    },
    {
      id: 1,
      name: "Attraction Name",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker incl",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      status: "paid",
    },
    {
      id: 1,
      name: "Attraction Name",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker incl",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      status: "free",
    },
    {
      id: 1,
      name: "Attraction Name",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker incl",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      status: "paid",
    },
    {
      id: 1,
      name: "Attraction Name",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker incl",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      status: "free",
    },
    {
      id: 1,
      name: "Attraction Name",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker incl",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      status: "paid",
    },
    {
      id: 1,
      name: "Attraction Name",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker incl",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      status: "free",
    },
    {
      id: 1,
      name: "Attraction Name",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker incl",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      status: "paid",
    },
  ];

  const [sort, setSort] = useState("sort");
  const [isSortOpen, setIsSortOpen] = useState(false);
  return (
    <div className="w-full h-auto flex flex-col justify-start items-start gap-4">
      <Link
        to={-1}
        style={{
          background: palette?.brand,
        }}
        className="rounded-full flex mr-auto justify-center items-center text-xs font-medium w-8 h-8 hover:opacity-90 text-white"
      >
        <IoMdArrowBack />
      </Link>
      <CategoryDetailHeader />
      <div className="w-full h-auto flex justify-start items-start flex-col gap-2">
        <div className="w-full flex justify-between items-center px-2">
          <h1
            className="text-2xl font-bold"
            style={{
              color: palette?.brand,
            }}
          >
            Attractions
          </h1>
        </div>

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
              onClick={() => setIsSortOpen((prev) => !prev)}
              className="w-full h-10 rounded-full text-sm pl-3 pr-1 flex justify-between items-center font-medium capitalize"
              style={{
                background: palette?.dark_contrast_background,
                color: palette?.color,
              }}
            >
              {sort}
              <span
                style={{
                  background: palette?.brand,
                }}
                className="w-8 h-8 text-white rounded-full flex items-center justify-center"
              >
                <GoSortDesc />
              </span>
            </button>
            {isSortOpen && (
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
                    setSort("date");
                    setIsSortOpen(false);
                  }}
                  className="w-full h-10 hover:opacity-90 rounded-full text-sm px-3 flex justify-between items-center font-medium capitalize"
                  style={{
                    background: palette?.light_contrast_background,
                    color: palette?.color,
                  }}
                >
                  Date
                </button>
                <button
                  onClick={() => {
                    setSort("name");
                    setIsSortOpen(false);
                  }}
                  className="w-full h-10 hover:opacity-90 rounded-full text-sm px-3 flex justify-between items-center font-medium capitalize"
                  style={{
                    background: palette?.light_contrast_background,
                    color: palette?.color,
                  }}
                >
                  Name
                </button>

                <button
                  onClick={() => {
                    setSort("likes");
                    setIsSortOpen(false);
                  }}
                  className="w-full h-10 hover:opacity-90 rounded-full text-sm px-3 flex justify-between items-center font-medium capitalize"
                  style={{
                    background: palette?.light_contrast_background,
                    color: palette?.color,
                  }}
                >
                  Likes
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="w-full flex h-auto flex-wrap justify-start items-start gap-2">
          {arr?.map((attraction) => {
            return <AttractionCard attraction={attraction} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;
