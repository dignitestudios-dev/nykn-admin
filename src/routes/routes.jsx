import ChangePassword from "../pages/ChangePassword";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PasswordUpdate from "../pages/PasswordUpdated";
import Stores from "../pages/Stores";
import Users from "../pages/Users";
import VerifyEmail from "../pages/VerifyEmail";
import VerifyOtp from "../pages/VerifyOtp";
import { BiHomeAlt } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { LiaStoreSolid } from "react-icons/lia";

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
    name: "Stores",
    url: "/stores",
    page: <Stores />,
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
  // {
  //   name: "Stores",
  //   url: "/stores",
  //   icon: <LiaStoreSolid className="text-xl" />,
  // },
];
