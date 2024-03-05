import React from "react";
import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import StoreSkeleton from "../components/stores/StoreSkeleton";

const Stores = () => {
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
    <div className="flex flex-col">
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
                  background: `${palette?.background}`,
                  color: palette?.dark_contrast_color,
                }}
              >
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                  >
                    Status
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                  >
                    Items Borrowed
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                  >
                    Items Lented
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody
                className={` divide-y ${
                  theme == "dark" ? "divide-[#3d3d3d]" : "divide-gray-200"
                }`}
                style={{
                  background: `${palette?.background}`,
                  color: palette?.dark_contrast_color,
                }}
              >
                {userLoading ? (
                  <StoreSkeleton />
                ) : (
                  users?.map((user) => {
                    return (
                      <tr key={user?.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={
                                  user?.avatar !== null
                                    ? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
                                    : "https://img.freepik.com/free-vector/3d-cartoon-young-woman-smiling-circle-frame-character-illustration-vector-design_40876-3100.jpg?w=740&t=st=1708694529~exp=1708695129~hmac=4816499f663fccaf89c3383e1ae7986e2baa830c38d19858d5723d900bd9a4ed"
                                }
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium ">
                                {user?.name}
                              </div>
                              <div
                                className="text-sm "
                                style={{ color: palette?.light_contrast_color }}
                              >
                                {user?.email}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {" "}
                            Active{" "}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm  ">
                          1
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm ">
                          1
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap  text-right text-sm font-medium">
                          <a
                            href="#"
                            className="text-red-600 ml-2 hover:text-red-500"
                          >
                            Suspend
                          </a>
                          <a
                            href="#"
                            className="text-blue-600 ml-3 hover:text-blue-500"
                          >
                            View More
                          </a>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stores;
