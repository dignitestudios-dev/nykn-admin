import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import UserCategoryCard from "../components/users/UserDetails/UserCategoryCard";
import { GlobalContext } from "../context/GlobalContext";
import UserInfo from "../components/users/UserDetails/UserInfo";

const UserDetail = () => {
  const { id } = useParams();
  const arr = [
    {
      name: "Category Name",
      description: "Category Description goes here",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      isPaid: false,
      isUnlocked: true,
    },
    {
      name: "Category Name",
      description: "Category Description goes here",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      isPaid: false,
      isUnlocked: false,
    },
    {
      name: "Category Name",
      description: "Category Description goes here",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      isPaid: true,
      isUnlocked: true,
    },
    {
      name: "Category Name",
      description: "Category Description goes here",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      isPaid: false,
      isUnlocked: false,
    },
    {
      name: "Category Name",
      description: "Category Description goes here",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      isPaid: true,
      isUnlocked: true,
    },
  ];
  return (
    <div className="w-full h-auto flex flex-col justify-start items-start gap-6">
      <UserInfo />
      <div className="w-full h-auto flex flex-wrap justify-start items-start gap-2 ">
        {arr?.map((item) => {
          return <UserCategoryCard key={item} category={item} />;
        })}
      </div>
    </div>
  );
};

export default UserDetail;
