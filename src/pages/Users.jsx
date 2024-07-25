import React from "react";
import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import UserCard from "../components/users/UserCard";
import UserSkeleton from "../components/users/UserSkeleton";
import { IoSearch } from "react-icons/io5";

const Users = () => {
  const { palette, theme, baseUrl, setIsLoggedIn } = useContext(GlobalContext);

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [userLoading, setUserLoading] = useState(false);
  const [reload, setReload] = useState(false);

  const [searchInput, setSearchInput] = useState("");

  const getUsers = () => {
    const token = Cookies.get("token");

    if (token) {
      setUserLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": true,
      };
      axios.get(`${baseUrl}/auth/getAllUser`, { headers }).then(
        (response) => {
          setUsers(response?.data);
          setUserLoading(false);
        },
        (error) => {
          setUserLoading(false);
          if (error?.response?.status == 401) {
            setIsLoggedIn(false);
            Cookies.remove("token");
            navigate("/login");
          }
        }
      );
    } else {
      navigate("/login");
    }
  };

  // Filter data based on user input in title or message
  const filteredData =
    users?.length > 0 &&
    users?.filter((user) => {
      user?.full_name
        ? user.full_name.toLowerCase().includes(searchInput.toLowerCase())
        : [];
    });

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    getUsers();
  }, [reload]);

  return (
    <div className="w-full h-auto flex flex-col gap-6 justify-start  items-start p-2 ">
      <div className="relative w-full border border-[#eaeaea] shadow rounded-full">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full h-12  rounded-full outline-none border-none px-4 text-sm"
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
      {userLoading ? (
        <UserSkeleton />
      ) : filteredData.length > 0 ? (
        <div className="w-full h-auto grid gap-3 grid-cols-1 md:grid-cols-2  lg:grid-cols-2 xl:grid-cols-3 ">
          {filteredData?.reverse()?.map((user) => {
            return (
              <UserCard key={user?._id} user={user} setReload={setReload} />
            );
          })}
        </div>
      ) : (
        <div className="w-full h-auto flex justify-center items-center">
          <span className="text-3xl font-bold flex flex-col w-full justify-center items-center h-auto py-4">
            <img src="/nothinghere.jpg" className="w-full md:w-1/2 lg:w-1/4" />
            Nothing here
          </span>
        </div>
      )}
    </div>
  );
};

export default Users;
