import React from "react";
import { LuUser2 } from "react-icons/lu";

export default function NavbarComp() {
  return (
    <div>
      <div className="navbar bg-transparent mt-4 brightness-100 px-2 md:px-16 ">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">
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
                  value="dark"
                  className="toggle theme-controller"
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
                <LuUser2 className="w-6 h-6 text-white" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
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
