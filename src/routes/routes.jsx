import { FaRegPlusSquare } from "react-icons/fa";
import ChangePassword from "../pages/ChangePassword";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PasswordUpdate from "../pages/PasswordUpdated";
import Stores from "../pages/Stores";
import UserDetail from "../pages/UserDetail";
import Users from "../pages/Users";
import VerifyEmail from "../pages/VerifyEmail";
import VerifyOtp from "../pages/VerifyOtp";
import { BiHomeAlt } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { LiaStoreSolid } from "react-icons/lia";
import RegisterUser from "../pages/RegisterUser";
import { BiCategoryAlt } from "react-icons/bi";
import Categories from "../pages/Categories";
import CategoryDetail from "../pages/CategoryDetail";
import CategoryAndAttractionCreation from "../pages/CategoryAndAttractionCreation";
import EditAttraction from "../pages/EditAttraction";
import { FiUserPlus } from "react-icons/fi";
import Attractions from "../pages/Attractions";
import { GoRocket } from "react-icons/go";
import Notifications from "../pages/Notifications";

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
    name: "Add Attraction",
    url: "/attraction/create",
    icon: <FaRegPlusSquare className="text-xl" />,
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
    icon: <GoRocket className="text-xl" />,
  },

  // {
  //   name: "Stores",
  //   url: "/stores",
  //   icon: <LiaStoreSolid className="text-xl" />,
  // },
];
