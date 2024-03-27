import React, { lazy } from "react";
import { FaRegPlusSquare } from "react-icons/fa";
const ChangePassword = lazy(() => import("../pages/ChangePassword"));
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const PasswordUpdate = lazy(() => import("../pages/PasswordUpdated"));
const UserDetail = lazy(() => import("../pages/UserDetail"));
const Users = lazy(() => import("../pages/Users"));
const VerifyEmail = lazy(() => import("../pages/VerifyEmail"));
const VerifyOtp = lazy(() => import("../pages/VerifyOtp"));
import { BiHomeAlt } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { LiaStoreSolid } from "react-icons/lia";
import RegisterUser from "../pages/RegisterUser";
import { BiCategoryAlt } from "react-icons/bi";
const Categories = lazy(() => import("../pages/Categories"));
const CategoryDetail = lazy(() => import("../pages/CategoryDetail"));
const CategoryAndAttractionCreation = lazy(() =>
  import("../pages/CategoryAndAttractionCreation")
);
const EditAttraction = lazy(() => import("../pages/EditAttraction"));
import { FiUserPlus } from "react-icons/fi";
const Attractions = lazy(() => import("../pages/Attractions"));
import { GoRocket } from "react-icons/go";
const Notifications = lazy(() => import("../pages/Notifications"));
import { IoMdNotificationsOutline } from "react-icons/io";

export const loginRoutes = [
  {
    name: "Login",
    url: "/login",
    page: <Login />,
  },
  {
    name: "Verify Email",
    url: "/verify-email",
    page: <VerifyEmail />,
  },
  {
    name: "Change Password",
    url: "/change-password",
    page: <ChangePassword />,
  },
  {
    name: "Password Updated",
    url: "/password-updated",
    page: <PasswordUpdate />,
  },

  {
    name: "Verify Otp",
    url: "/verify-otp",
    page: <VerifyOtp />,
  },
];

export const normalRoutes = [
  {
    name: "Create User",
    url: "/create-user/",
    page: <RegisterUser />,
  },
  {
    name: "Discover",
    url: "/discover",
    page: <Home />,
  },
  {
    name: "Users",
    url: "/users",
    page: <Users />,
  },
  {
    name: "User Details",
    url: "/users/:id",
    page: <UserDetail />,
  },
  {
    name: "Categories",
    url: "/categories",
    page: <Categories />,
  },
  {
    name: "Attractions",
    url: "/attractions",
    page: <Attractions />,
  },
  {
    name: "Category Details",
    url: "/categories/:id",
    page: <CategoryDetail />,
  },
  {
    name: "Attraction Details",
    url: "/attraction/:id",
    page: <EditAttraction />,
  },
  {
    name: "Create",
    url: "/attraction/create",
    page: <CategoryAndAttractionCreation />,
  },
  {
    name: "Notifications",
    url: "/notifications",
    page: <Notifications />,
  },
];

export const sidebarArr = [
  {
    name: "Discover",
    url: "/discover",
    icon: <BiHomeAlt className="text-xl" />,
  },
  {
    name: "Users",
    url: "/users",
    icon: <FiUsers className="text-xl" />,
  },
  {
    name: "Create User",
    url: "/create-user/",
    icon: <FiUserPlus className="text-xl" />,
  },
  {
    name: "Categories",
    url: "/categories",
    icon: <BiCategoryAlt className="text-xl" />,
  },
  {
    name: "Attractions",
    url: "/attractions",
    icon: <GoRocket className="text-xl" />,
  },
  {
    name: "Notifications",
    url: "/notifications",
    icon: <IoMdNotificationsOutline className="text-xl" />,
  },

  // {
  //   name: "Stores",
  //   url: "/stores",
  //   icon: <LiaStoreSolid className="text-xl" />,
  // },
];
