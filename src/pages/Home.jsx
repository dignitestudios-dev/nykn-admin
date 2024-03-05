import React from "react";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import MainBanner from "../components/home/MainBanner";
import UsersCard from "../components/home/UsersCard";
import StoreCard from "../components/home/StoreCard";
import TransactionGraph from "../components/home/TransactionGraph";
import UsersTable from "../components/home/UsersTable";

const Home = () => {
  const { palette } = useContext(GlobalContext);
  return (
    <div
      className="w-full h-auto   flex flex-col gap-6 items-start justify-start text-4xl font-bold text-orange-500"
      style={{
        background: palette?.background,
      }}
    >
      <div className="w-full  h-auto  flex-wrap  flex justify-start items-end gap-4">
        <MainBanner />
        <UsersCard />
        <StoreCard />
      </div>

      <div className="w-full  h-auto  flex-wrap  flex justify-start items-start gap-4">
        <TransactionGraph />
        <div className="h-auto w-full lg:w-[38%]">
          <UsersTable />
        </div>
      </div>
    </div>
  );
};

export default Home;
