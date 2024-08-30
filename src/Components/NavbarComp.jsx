import React, { useEffect, useState } from "react";
import { LuUser2 } from "react-icons/lu";
import { setCookie, checkCookie } from "./functions";
import { useLocation, useNavigate } from "react-router-dom";

export default function NavbarComp(props) {
  const [scrolled, setScrolled] = useState(false);
  const isLogged = checkCookie();

  const navigate = useNavigate();

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const viewportHeight = window.innerHeight;
    setScrolled(scrollPosition > viewportHeight);
  };

  useEffect(() => {
    if (window.sessionStorage.getItem("theme") === null) {
      window.sessionStorage.setItem("theme", "black");
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleLogout = () => {
    // Assuming setCookie sets a cookie with name, value, and expiry date
    setCookie("accessToken", "", "Thu, 01 Jan 1970 00:00:00 GMT"); // Set value to empty string
    setCookie("user", "", "Thu, 01 Jan 1970 00:00:00 GMT"); // Set value to empty string

    // Navigate to home page
    navigate("/");
  };

  return (
    <div>
      <div
        className={`navbar pt-4 brightness-100 px-2 md:px-6 xl:px-16 fixed ${
          scrolled ? "bg-black" : "bg-transparent"
        }`}
      >
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
                  onChange={() => {
                    window.sessionStorage.setItem(
                      "theme",
                      window.sessionStorage.getItem("theme") === "black"
                        ? "light"
                        : "black"
                    );
                  }}
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
                <LuUser2 className="w-6 h-6 text-white" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-lg z-[1] mt-3 w-52 p-2 shadow"
            >
              {isLogged && (
                <>
                  {" "}
                  <li>
                    <a className="justify-between" href="/">
                      Home
                    </a>
                  </li>
                  <li>
                    <a className="justify-between" href="/mybookings">
                      My Bookings
                    </a>
                  </li>
                  <li onClick={handleLogout}>
                    <a>Logout</a>
                  </li>
                </>
              )}
              {!isLogged && (
                <>
                  {" "}
                  <li>
                    <a className="justify-between" href="/">
                      Home
                    </a>
                  </li>
                  <li>
                    <a className="justify-between" href="/login">
                      My Bookings
                    </a>
                  </li>
                  <li>
                    <a href="/login">Login</a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
