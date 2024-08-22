import React from "react";
import { LuUser2 } from "react-icons/lu";

export default function NavbarComp() {
  return (
    <div>
      <div className="navbar bg-transparent mt-4 brightness-100 px-2 md:px-6 xl:px-16 fixed">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl" href="/">
            <img
              src="https://ik.imagekit.io/ok2wgebfs/Untitled-2%202.png?updatedAt=1723876926038"
              alt=""
            />
          </a>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <input
                  type="checkbox"
                  value="light"
                  className="toggle theme-controller !rounded-full"
                />
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 !flex justify-center items-center rounded-full">
                <LuUser2 className="w-6 h-6 black:text-white light:text-black" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-lg z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">Bookings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
