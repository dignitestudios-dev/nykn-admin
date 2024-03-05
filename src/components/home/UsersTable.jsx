import React from "react";
import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import StoreSkeleton from "../stores/StoreSkeleton";

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
      axios.get(`${baseUrl}/users`, { headers }).then(
        (response) => {
          setUsers(response?.data?.data?.users);
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
                    Type
                  </th>

                  <th
                    scope="col"
                    className="px-2 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                  >
                    Email
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
                            user?.avatar !== null
                              ? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
                              : "https://img.freepik.com/free-vector/3d-cartoon-young-woman-smiling-circle-frame-character-illustration-vector-design_40876-3100.jpg?w=740&t=st=1708694529~exp=1708695129~hmac=4816499f663fccaf89c3383e1ae7986e2baa830c38d19858d5723d900bd9a4ed"
                          }
                          alt=""
                        />
                      </td>

                      <td className="px-2 py-2 text-[10px] whitespace-nowrap">
                        {user?.name}
                      </td>
                      <td className="px-2 py-2 text-[10px] whitespace-nowrap">
                        <span className="min-w-14 w-auto h-5 rounded-full flex items-center justify-center font-medium text-[9.5px] text-blue-500 bg-blue-500/[0.05]">
                          {user?.type}
                        </span>
                      </td>

                      <td className="px-2 py-2  whitespace-nowrap   text-[10px] font-medium">
                        {user?.email}
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
