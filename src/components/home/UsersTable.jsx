import React from "react";
import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import StoreSkeleton from "../stores/StoreSkeleton";
import { MdPaid } from "react-icons/md";
import { FaHeart } from "react-icons/fa";

const UsersTable = () => {
  const { palette, theme, baseUrl, setIsLoggedIn } = useContext(GlobalContext);

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [userLoading, setUserLoading] = useState(false);

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

  return (
    <div className="w-full h-auto max-h-full flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div
            className="shadow overflow-hidden  sm:rounded-lg"
            style={{
              borderBottom: `2px solid ${palette?.dark_contrast_background}`,
            }}
          >
            <table
              className={`min-w-full divide-y ${
                theme == "dark" ? "divide-[#3d3d3d]" : "divide-gray-200"
              }`}
            >
              <thead
                style={{
                  background: palette?.dark_contrast_background,
                  color: palette?.dark_contrast_color,
                }}
              >
                <tr>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                  >
                    Avatar
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                  >
                    Name
                  </th>

                  <th
                    scope="col"
                    className="px-2 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                  >
                    Categories Bought
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                  >
                    Attractions Liked
                  </th>
                </tr>
              </thead>
              <tbody
                className={` divide-y ${
                  theme == "dark" ? "divide-[#3d3d3d]" : "divide-gray-200"
                }`}
                style={{
                  background: palette?.dark_contrast_background,
                  color: palette?.dark_contrast_color,
                }}
              >
                {users?.slice(0, 5)?.map((user) => {
                  return (
                    <tr key={user?.id}>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7GhCyNdACcNjy7_Y2r7CP6bxSXo2yM0yEfQ&usqp=CAU"
                          }
                          alt=""
                        />
                      </td>

                      <td className="px-2 py-2 text-[10px] lg:text-[12px] whitespace-nowrap">
                        {user?.full_name}
                      </td>

                      <td className="px-2 py-2  whitespace-nowrap   text-[10px] lg:text-[12px] font-medium">
                        {user?.email}
                      </td>
                      <td className="px-2 py-2  whitespace-nowrap   text-[10px] font-medium">
                        <span className="w-auto flex justify-start items-center gap-1">
                          <span className="text-lg">0</span>
                          <MdPaid className="text-blue-500 text-lg" />
                        </span>
                      </td>
                      <td className="px-2 py-2  whitespace-nowrap   text-[10px] font-medium">
                        <span className="w-auto flex justify-start items-center gap-1">
                          <span className="text-lg">0</span>
                          <FaHeart className="text-red-500 text-lg" />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
