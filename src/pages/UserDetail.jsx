import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserCategoryCard from "../components/users/UserDetails/UserCategoryCard";
import { GlobalContext } from "../context/GlobalContext";
import UserInfo from "../components/users/UserDetails/UserInfo";
import { IoSearch } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import axios from "axios";
import Cookies from "js-cookie";

const UserDetail = () => {
  const { id } = useParams();
  const { palette, theme, baseUrl, setError } = useContext(GlobalContext);

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
  const filteredData = response?.filter((attraction) =>
    attraction.subCategory_title
      .toLowerCase()
      .includes(searchInput.toLowerCase())
  );

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [updateData]);

  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("free");

  return (
    <div className="w-full h-auto flex flex-col justify-start items-start gap-6">
      <UserInfo />
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
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-full h-10 rounded-full text-sm px-3 flex justify-between items-center font-medium capitalize"
            style={{
              background: palette?.dark_contrast_background,
              color: palette?.color,
            }}
          >
            {status}
            <span
              style={{
                background: palette?.brand,
              }}
              className="w-5 h-5 text-white rounded-full flex items-center justify-center"
            >
              <MdKeyboardArrowDown />
            </span>
          </button>
          {isOpen && (
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
                  setStatus("paid");
                  setIsOpen(false);
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
                  setStatus("free");
                  setIsOpen(false);
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
      <div className="w-full h-auto flex flex-wrap justify-start items-start gap-2 ">
        {filteredData?.map((item, key) => {
          return <UserCategoryCard key={key} category={item} />;
        })}
      </div>
    </div>
  );
};

export default UserDetail;
