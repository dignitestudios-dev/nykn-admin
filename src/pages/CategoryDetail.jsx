import React, { useContext, useState, useEffect } from "react";
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
import axios from "axios";
import Cookies from "js-cookie";
import CategorySkeleton from "../components/Categories/CategorySkeleton";

const CategoryDetail = () => {
  const { id } = useParams();
  const { palette, theme, baseUrl, setError } = useContext(GlobalContext);

  const [sort, setSort] = useState("sort");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const [updateData, setUpdateData] = useState(false);

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
          `${baseUrl}/GetAllSubcategories`,
          { category_Id: id },
          { headers }
        )
        .then((response) => {
          setResponse(response?.data?.subCategories);

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

  const [searchInput, setSearchInput] = useState("");
  // Filter data based on user input in title or message
  const filteredData =
    response?.length > 0 &&
    response?.filter((attraction) =>
      attraction.subCategory_title
        .toLowerCase()
        .includes(searchInput.toLowerCase())
    );

  const sortedData =
    filteredData &&
    filteredData?.sort((a, b) => {
      if (sort === "alphabetical") {
        return a.subCategory_title.localeCompare(b.subCategory_title);
      } else if (sort === "wishlist") {
        return b.wishlist - a.wishlist;
      } else if (sort === "date") {
        return new Date(b.timings) - new Date(a.timings);
      }
      return 0; // Default case
    });

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [updateData]);

  return (
    <div className="w-full h-auto flex flex-col justify-start items-start gap-4">
      <Link
        to={-1}
        style={{
          background: palette?.brand,
        }}
        className="rounded-full flex mr-auto justify-center items-center text-xs font-medium w-10 h-10 hover:opacity-90 text-white"
      >
        <IoMdArrowBack />
      </Link>
      <CategoryDetailHeader />
      <div className="w-full h-auto flex justify-start items-start flex-col gap-4">
        <div className="w-full flex justify-between items-center px-2">
          <h1
            className="text-3xl font-bold"
            style={{
              color: palette?.brand,
            }}
          >
            Attractions
          </h1>
        </div>

        <div className="w-full flex justify-start items-start gap-2">
          <div className="relative bg-white shadow border border-[#eaeaea]  rounded-full w-[70%] lg:w-[85%]">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full h-12 rounded-full outline-none border-none px-4 text-sm"
              placeholder="Search"
              style={{
                color: palette?.color,
              }}
            />
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center absolute top-2 right-2 "
              style={{ background: palette?.brand, color: palette?.color }}
            >
              <IoSearch className="text-white" />
            </button>
          </div>
          <div className="w-[30%] lg:w-[15%] bg-white shadow border border-[#eaeaea]  rounded-full relative">
            <button
              onClick={() => setIsSortOpen((prev) => !prev)}
              className="w-full h-12  text-sm pl-3 pr-2 flex justify-between items-center font-medium capitalize"
              style={{
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
              <div className="w-full mt-1 h-auto bg-white flex flex-col justify-start items-start gap-2 shadow-md absolute top-12 p-2 rounded-3xl">
                <button
                  onClick={() => {
                    setSort("alphabetical");
                    setIsSortOpen(false);
                  }}
                  className="w-full h-10  hover:shadow bg-white border border-[#eaeaea]  rounded-full text-sm px-3 flex justify-between items-center font-medium capitalize"
                  style={{
                    color: palette?.color,
                  }}
                >
                  Alphabetical
                </button>

                <button
                  onClick={() => {
                    setSort("wishlist");
                    setIsSortOpen(false);
                  }}
                  className="w-full h-10  hover:shadow bg-white border border-[#eaeaea]  rounded-full text-sm px-3 flex justify-between items-center font-medium capitalize"
                  style={{
                    color: palette?.color,
                  }}
                >
                  Wishlist
                </button>
              </div>
            )}
          </div>
        </div>
        {loading ? (
          <CategorySkeleton />
        ) : sortedData.length > 0 ? (
          <div className="w-full grid grid-cols1 md:grid-cols-2 gap-2">
            {sortedData?.map((attraction) => {
              return <AttractionCard attraction={attraction} />;
            })}
          </div>
        ) : (
          <div className="w-full h-auto flex justify-center items-center">
            <span className="text-3xl font-bold flex flex-col w-full justify-center items-center h-auto py-4">
              <img
                src="/nothinghere.jpg"
                className="w-full md:w-1/2 lg:w-1/4"
              />
              Nothing here
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryDetail;
