import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import UserCategoryCard from "../components/users/UserDetails/UserCategoryCard";
import { GlobalContext } from "../context/GlobalContext";
import UserInfo from "../components/users/UserDetails/UserInfo";
import { IoSearch } from "react-icons/io5";
import { IoMdArrowBack } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import axios from "axios";
import Cookies from "js-cookie";
import Loader from "../components/global/Loader";
import AttractionCard from "../components/Categories/CategoryDetails/AttractionCard";
import UserWishlistCard from "../components/users/UserDetails/UserWishlistCard";

const UserDetail = () => {
  const { id } = useParams();
  const { palette, theme, baseUrl, setError } = useContext(GlobalContext);

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState({});

  const getData = () => {
    const token = Cookies.get("token");

    if (token) {
      setLoading(true);

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      axios
        .post(`${baseUrl}/getUserById`, { userId: id }, { headers })
        .then((response) => {
          setResponse(response?.data?.categorizedData);
          setWishlist(response?.data?.userWishlist);
          setUser(response?.data?.user);
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
  let filteredData = response?.filter((category) =>
    category.category_title.toLowerCase().includes(searchInput.toLowerCase())
  );

  useEffect(() => {
    getData();
  }, []);

  const [updateData, setUpdateData] = useState(false);
  useEffect(() => {
    getData();
  }, [updateData]);

  return (
    <div className="w-full h-auto flex flex-col justify-start items-start gap-6">
      <Link
        to={-1}
        style={{
          background: palette?.brand,
        }}
        className="rounded-full flex mr-auto justify-center items-center text-xs font-medium w-10 h-10 hover:opacity-90 text-white"
      >
        <IoMdArrowBack />
      </Link>
      <UserInfo user={user} />
      <h1 className="text-3xl font-bold">Categories</h1>
      <div className="w-full flex justify-start items-start gap-2">
        <div className="relative bg-white border border-[#eaeaea] shadow rounded-full w-full">
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
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
      </div>
      <div className="w-full h-auto  ">
        {loading ? (
          <Loader />
        ) : filteredData?.length > 0 ? (
          <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {filteredData?.map((item, key) => {
              return (
                <UserCategoryCard
                  key={key}
                  category={item}
                  updateData={setUpdateData}
                />
              );
            })}
          </div>
        ) : (
          <div className="w-full flex justify-center items-center">
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

      <h1 className="text-3xl font-bold">Wishlist</h1>
      <div className="w-full h-auto ">
        {loading ? (
          <Loader />
        ) : wishlist?.length > 0 ? (
          <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 ">
            {wishlist?.map((item, key) => {
              return <UserWishlistCard key={key} attraction={item} />;
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

export default UserDetail;
