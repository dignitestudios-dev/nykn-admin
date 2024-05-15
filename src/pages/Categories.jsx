import React, { useContext, useState, useEffect } from "react";
import CategoryCard from "../components/Categories/CategoryCard";
import { IoSearch } from "react-icons/io5";
import { GlobalContext } from "../context/GlobalContext";
import { CiFilter } from "react-icons/ci";
import { GoSortDesc } from "react-icons/go";
import CategoryModal from "../components/AddCategoryAndAttraction/CategoryModal";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import CategorySkeleton from "../components/Categories/CategorySkeleton";

const Categories = () => {
  const navigate = useNavigate();
  const {
    palette,
    theme,
    isCategoryOpen,
    categoryAddRef,
    setIsCategoryOpen,
    baseUrl,
    setError,
  } = useContext(GlobalContext);

  const [filter, setFilter] = useState("filter");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const [updateData, setUpdateData] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const getData = () => {
    const token = Cookies.get("token");

    if (token) {
      setLoading(true);

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      axios
        .get(`${baseUrl}/GetAllCategory`, { headers })
        .then((response) => {
          setResponse(response?.data?.categories);

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

  // Filter data based on user input in title or message
  const filteredData =
    response?.length > 0 &&
    response?.filter(
      (categories) =>
        categories.category_title
          .toLowerCase()
          .includes(searchInput.toLowerCase()) &&
        (filter === "free"
          ? !categories.isPaid
          : filter === "paid"
          ? categories.isPaid
          : true)
    );

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [updateData]);

  const skeleton = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="w-full flex h-auto flex-wrap justify-start items-start gap-2">
      <div className="w-full my-3 flex justify-between items-center px-2">
        <h1
          className="text-3xl font-bold"
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
          className="w-32 h-12  transition-all duration-150 hover:opacity-90  outline-none border-none text-white text-xs font-medium rounded-full"
        >
          Add Category
        </button>
      </div>

      {/* Category Add Modal */}
      <CategoryModal
        updateData={setUpdateData}
        isOpen={isCategoryOpen}
        setIsOpen={setIsCategoryOpen}
        categoryAddRef={categoryAddRef}
      />
      <div className="w-full h-auto flex flex-col justify-start items-start gap-6">
        <div className="w-full flex justify-start items-start gap-2">
          <div className="relative w-[70%] lg:w-[90%] border shadow border-[#eaeaea] rounded-full">
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
          <div className="w-[30%] lg:w-[10%] relative border shadow border-[#eaeaea] rounded-full">
            <button
              onClick={() => setIsFilterOpen((prev) => !prev)}
              className="w-full h-12 rounded-full text-sm pl-3 pr-2 flex justify-between items-center font-medium capitalize"
              style={{
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
              <div className="w-full bg-white mt-1 shadow  h-auto flex flex-col justify-start items-start gap-2 border order-[#eaeaea] absolute top-12 p-2 rounded-3xl">
                <button
                  onClick={() => {
                    setFilter("All");
                    setIsFilterOpen(false);
                  }}
                  className="w-full h-9 bg-white border border-[#eaeaea] hover:shadow hover:opacity-90 rounded-full text-sm px-3 flex justify-between items-center font-medium capitalize"
                  style={{
                    color: palette?.color,
                  }}
                >
                  All
                </button>
                <button
                  onClick={() => {
                    setFilter("paid");
                    setIsFilterOpen(false);
                  }}
                  className="w-full h-9 bg-white border border-[#eaeaea] hover:shadow hover:opacity-90 rounded-full text-sm px-3 flex justify-between items-center font-medium capitalize"
                  style={{
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
                  className="w-full h-9 bg-white border border-[#eaeaea] hover:shadow hover:opacity-90 rounded-full text-sm px-3 flex justify-between items-center font-medium capitalize"
                  style={{
                    color: palette?.color,
                  }}
                >
                  Free
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="w-full h-auto">
          {loading ? (
            <div className="w-full h-auto grid gap-3 grid-cols-1 md:grid-cols-2  lg:grid-cols-2 ">
              {skeleton?.map((item) => {
                return <CategorySkeleton key={item} />;
              })}
            </div>
          ) : filteredData.length > 0 ? (
            <div className="w-full h-auto grid gap-3 grid-cols-1 md:grid-cols-2  lg:grid-cols-2 ">
              {filteredData?.reverse()?.map((category) => {
                return <CategoryCard category={category} key={category?._id} />;
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
    </div>
  );
};

export default Categories;
