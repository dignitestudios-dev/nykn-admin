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

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    getUsers();
  }, [reload]);

  return (
    <div className="w-full h-auto flex gap-2 justify-start  items-start p-2 flex-wrap">
      <div className="relative w-full">
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
      {userLoading ? (
        <UserSkeleton />
      ) : (
        users?.map((user) => {
          return <UserCard key={user?.id} user={user} setReload={setReload} />;
        })
      )}
    </div>
  );
};

export default Users;
