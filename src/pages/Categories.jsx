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
          setResponse(response?.data);

          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
          setError(error?.response?.data?.error);
        });
    } else {
      setLoading(false);
      navigate("/login/");
    }
  };

  // Filter data based on user input in title or message
  const filteredData = response?.filter((categories) =>
    categories.category_title.toLowerCase().includes(searchInput.toLowerCase())
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
        updateData={setUpdateData}
        isOpen={isCategoryOpen}
        setIsOpen={setIsCategoryOpen}
        categoryAddRef={categoryAddRef}
      />

      <div className="w-full flex justify-start items-start gap-2">
        <div className="relative w-[70%] lg:w-[90%]">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
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

      {loading ? (
        skeleton?.map((item) => {
          return <CategorySkeleton key={item} />;
        })
      ) : filteredData.length > 0 ? (
        filteredData?.map((category) => {
          return <CategoryCard category={category} key={category?._id} />;
        })
      ) : (
        <span className="text-3xl font-bold flex flex-col w-full justify-center items-center h-auto py-4">
          <img src="/nothinghere.jpg" className="w-full md:w-1/2 lg:w-1/4" />
          Nothing here
        </span>
      )}
    </div>
  );
};

export default Categories;
