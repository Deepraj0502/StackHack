import React from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { MdTheaters } from "react-icons/md";
import { BiSolidCameraMovie } from "react-icons/bi";
import { IoLogOut } from "react-icons/io5";
import { HiOutlineBars3 } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

export default function AdminSidebar(props) {
  const navigate = useNavigate();
  return (
    <div
      className={`${
        props.visible ? "w-[60%]" : "w-0 invisible"
      } z-40 md:!w-[20%] md:visible  h-[100vh] bg-[#1f263c] fixed p-6 transition-all overflow-x-hidden`}
    >
      <div className="flex justify-between w-full items-center">
        <a href="/">
          <img
            src="https://ik.imagekit.io/ok2wgebfs/Untitled-2%202.png?updatedAt=1723876926038"
            alt=""
          />
        </a>
        <HiOutlineBars3
          className="w-6 h-6 md:hidden cursor-pointer"
          onClick={() => props.setVisible(!props.visible)}
        />
      </div>
      <div className="mt-10 flex flex-col gap-6">
        <div
          className={
            props.selected === "Dashboard"
              ? "flex gap-2 items-center rounded-md bg-[#2c5cff] p-2 cursor-pointer"
              : "flex gap-2 items-center rounded-md hover:bg-[#171b2b] p-2 cursor-pointer"
          }
          onClick={() => {
            navigate("/admin/dashboard");
          }}
        >
          <MdSpaceDashboard className="w-5 h-5 md:w-6 md:h-6" />
          <p className="text-sm md:text-lg">Dashboard</p>
        </div>
        <div
          className={
            props.selected === "Users"
              ? "flex gap-2 items-center rounded-md bg-[#2c5cff] p-2 cursor-pointer"
              : "flex gap-2 items-center rounded-md hover:bg-[#171b2b] p-2 cursor-pointer"
          }
          onClick={() => {
            navigate("/admin/users");
          }}
        >
          <FaUser className="w-5 h-5 md:w-6 md:h-6" />
          <p className="text-sm md:text-lg">Users</p>
        </div>
        <div
          className={
            props.selected === "Movies"
              ? "flex gap-2 items-center rounded-md bg-[#2c5cff] p-2 cursor-pointer"
              : "flex gap-2 items-center rounded-md hover:bg-[#171b2b] p-2 cursor-pointer"
          }
          onClick={() => {
            navigate("/admin/movies");
          }}
        >
          <BiSolidCameraMovie className="w-5 h-5 md:w-6 md:h-6" />
          <p className="text-sm md:text-lg">Movies</p>
        </div>
        <div
          className={
            props.selected === "Theaters"
              ? "flex gap-2 items-center rounded-md bg-[#2c5cff] p-2 cursor-pointer"
              : "flex gap-2 items-center rounded-md hover:bg-[#171b2b] p-2 cursor-pointer"
          }
          onClick={() => {
            navigate("/admin/theaters");
          }}
        >
          <MdTheaters className="w-5 h-5 md:w-6 md:h-6" />
          <p className="text-sm md:text-lg">Theaters</p>
        </div>
        <div
          className="flex gap-2 items-center rounded-md hover:bg-[#171b2b] p-2 cursor-pointer"
          onClick={() => {
            setCookie("accessToken", null, "Thu, 01 Jan 1970 00:00:00 UTC");
            setCookie("user", null, "Thu, 01 Jan 1970 00:00:00 UTC");
            navigate("/");
          }}
        >
          <IoLogOut className="w-5 h-5 md:w-6 md:h-6" />
          <p className="text-sm md:text-lg">Logout</p>
        </div>
      </div>
    </div>
  );
}
