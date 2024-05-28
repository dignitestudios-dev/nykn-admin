import React, { useContext, useRef, useState, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { LuImagePlus } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import axios from "axios";
import BtnLoader from "../global/BtnLoader";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const BulkPriceModal = ({ isOpen, setIsOpen, bulkpriceRef }) => {
  const navigate = useNavigate();
  const { palette, theme, baseUrl, setError, setSuccess } =
    useContext(GlobalContext);
  // Image:

  const toggleModal = (e) => {
    if (!bulkpriceRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState("");

  const getData = () => {
    const token = Cookies.get("token");

    if (token) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(`${baseUrl}/getCategoryPackage`, { headers })
        .then((response) => {
          setPrice(response?.data?.package_price);
        })
        .catch((error) => {
          setError(error?.response?.data?.error);
        });
    } else {
      setLoading(false);
      navigate("/login/");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const isInputValid = (input) => {
    const regex = /^[0-9]+$/;
    return regex.test(input);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (price == "") {
      setError("Price field cannot be left empty.");
    } else if (!isInputValid(price)) {
      setError("Price must be a number not an alphabet.");
    } else {
      const token = Cookies.get("token");
      if (token) {
        setLoading(true);
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        axios
          .post(
            `${baseUrl}/createCategoryPackage`,
            {
              package_price: price,
            },
            { headers }
          )
          .then(
            (response) => {
              setLoading(false);
              setSuccess("Pricings updated Successfully.");
              setPrice("");
              // navigate("/categories");
              setIsOpen(false);
            },
            (error) => {
              setError(error?.response?.data?.error);

              setLoading(false);
            }
          );
      } else {
        Cookies.remove("token");
        navigate("/login");
      }
    }
  };

  return (
    <div
      onClick={toggleModal}
      id="category-add-modal"
      className={`fixed top-0 left-0 transition-all duration-500  z-[1000] w-screen h-screen ${
        isOpen ? "scale-1" : "scale-0"
      } flex items-center justify-center`}
    >
      <form
        onSubmit={handleSubmit}
        ref={bulkpriceRef}
        className="w-96 h-auto shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-3xl flex flex-col gap-2 justify-start items-center  p-4"
        style={{ background: palette?.background, color: palette?.color }}
      >
        <span className="text-2xl font-bold">Update Bulk Pricings</span>

        <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full h-12 border border-[#eaeaea] shadow rounded-full text-sm  outline-none  px-4"
            style={{}}
            type="text"
            placeholder="Price"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            background: palette?.brand,
          }}
          className="w-full h-12 flex justify-center items-center  transition-all duration-150 hover:opacity-90  outline-none border-none text-white text-md font-medium rounded-full"
        >
          {loading ? <BtnLoader /> : "Update"}
        </button>
      </form>
    </div>
  );
};

export default BulkPriceModal;
