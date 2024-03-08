import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { LuImagePlus } from "react-icons/lu";
import AttractionContainer from "../components/AddCategoryAndAttraction/AttractionContainer";

const CategoryAndAttractionCreation = () => {
  const { palette } = useContext(GlobalContext);

  return (
    <div className="w-full h-auto p-0 md:p-2 lg:p-4  flex flex-col lg:flex-row gap-4 justify-start items-start">
      {/* <div className="w-full lg:w-1/2 flex flex-col justify-start items-start gap-4">
        <CategoryContainer />

        <LabelContainer />
      </div> */}

      <AttractionContainer />
    </div>
  );
};

export default CategoryAndAttractionCreation;
