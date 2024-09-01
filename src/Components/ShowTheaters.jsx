import React, { useEffect, useState } from "react";
import NavbarComp from "./NavbarComp";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getCookie } from "./functions";
import { FaStar } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";

export default function ShowTheaters() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(getCookie("user"));
  return (
    <>
      <ToastContainer />
      <NavbarComp />
      <div
        className="p-4 pt-20 md:hidden"
        style={{
          background: 'url("' + location.state.image + '")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <iframe
          src="https://www.youtube.com/embed/1Q8fG0TtVAY"
          className="w-[90%] mx-auto h-52 md:hidden"
        ></iframe>
      </div>

      <div className="flex md:h-[100vh]">
        <div
          className="hidden md:block w-0 md:w-[30%] lg:w-[40%] xl:w-[50%] bg-cover bg-center md:p-4 lg:p-12 xl:p-24"
          style={{ backgroundImage: "url('" + location.state.image + "')" }}
        >
          <div className="flex gap-6 md:mt-24 lg:mt-16 xl:mt-8 items-end border-0 border-b-[1px] border-[#AB0A10] pb-2 w-max">
            <h1 className="font-semibold text-xl text-white">
              {location.state.name}
            </h1>
            <h1 className="text-md text-white">1 h. 18 m.</h1>
          </div>
          <p className="mt-8 text-white">
            Wonder Woman finds herself battling two opponents, Maxwell Lord, a
            shrewd entrepreneur, and Barbara Minerva, a friend-turned-foe.
            Meanwhile, she also ends up crossing paths with her love interest
          </p>
          <iframe
            src="https://www.youtube.com/embed/1Q8fG0TtVAY"
            className="hidden md:block w-full h-80 mt-10"
          ></iframe>
        </div>
        <div className="w-full md:w-[70%] lg:w-[60%] xl:w-[50%] flex flex-col mt-20 px-8 py-8 md:py-0">
          <h2 className="text-2xl font-bold">Theaters</h2>
          <div className="w-full bg-[#14213d] p-4 rounded-md mt-4">
            <div className="flex justify-between items-start">
              <h1 className="text-lg font-bold w-[70%]">Miraj Cinema</h1>
              <div className="flex gap-2 items-center">
                <FaStar className="text-yellow-300 w-5 h-5" />
                <p className="font-semibold text-lg">4.5/5</p>
              </div>
            </div>
            <div className="flex gap-2 items-start mt-4">
              <IoLocation className="text-white w-4 h-4 relative top-1" />
              <p className=" text-md">New Panvel</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <p>
                Ticket Price: <b>₹250</b>
              </p>
              <button className="bg-[#8D090D] rounded-lg p-2 px-4 sm:px-6 text-white text-xs sm:text-sm ">
                Book Now
              </button>
            </div>
          </div>
          <div className="w-full bg-[#14213d] p-4 rounded-md mt-4">
            <div className="flex justify-between items-start">
              <h1 className="text-lg font-bold w-[70%]">Miraj Cinema</h1>
              <div className="flex gap-2 items-center">
                <FaStar className="text-yellow-300 w-5 h-5" />
                <p className="font-semibold text-lg">4.5/5</p>
              </div>
            </div>
            <div className="flex gap-2 items-start mt-4">
              <IoLocation className="text-white w-4 h-4 relative top-1" />
              <p className=" text-md">New Panvel</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <p>
                Ticket Price: <b>₹250</b>
              </p>
              <button className="bg-[#8D090D] rounded-lg p-2 px-4 sm:px-6 text-white text-xs sm:text-sm ">
                Book Now
              </button>
            </div>
          </div>
          <div className="w-full bg-[#14213d] p-4 rounded-md mt-4">
            <div className="flex justify-between items-start">
              <h1 className="text-lg font-bold w-[70%]">Miraj Cinema</h1>
              <div className="flex gap-2 items-center">
                <FaStar className="text-yellow-300 w-5 h-5" />
                <p className="font-semibold text-lg">4.5/5</p>
              </div>
            </div>
            <div className="flex gap-2 items-start mt-4">
              <IoLocation className="text-white w-4 h-4 relative top-1" />
              <p className=" text-md">New Panvel</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <p>
                Ticket Price: <b>₹250</b>
              </p>
              <button
                className="bg-[#8D090D] rounded-lg p-2 px-4 sm:px-6 text-white text-xs sm:text-sm "
                onClick={() => {
                  navigate("/booking", {
                    state: {
                      name: location.state.name,
                      image: location.state.image,
                    },
                  });
                }}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
