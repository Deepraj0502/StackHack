import React, { useState } from "react";
import { db } from "../../firebase";

import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { setCookie } from "../functions";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const bookingRef3 = doc(db, "users", `admin`);
      const bookingSnap3 = await getDoc(bookingRef3);

      if (
        bookingSnap3.data().username === loginData.username &&
        bookingSnap3.data().password === loginData.password
      ) {
        setCookie("user", "admin", new Date().getTime());
        navigate("/admin/dashboard");
        toast.success("Success");
      } else {
        toast.error("Error");
      }
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleAuthError = (error) => {
    const errorMessage = error.message;
    if (error.code === "auth/wrong-password") {
      toast.error("Invalid email or password");
    } else if (error.code === "auth/user-not-found") {
      toast.error("No user found with this email");
    } else if (error.code === "auth/email-already-in-use") {
      toast.error("Email already registered");
    } else {
      toast.error("Authentication failed. Please try again.");
    }
    console.error("Authentication Error:", error);
  };
  return (
    <div className="md:h-[100vh] w-[100vw] flex">
      <ToastContainer />
      <img
        src="https://scontent.fbom3-1.fna.fbcdn.net/v/t1.6435-9/92567930_1611352415683557_7530899753928753152_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_ohc=uSLhGPeSfO8Q7kNvgGxJOkn&_nc_ht=scontent.fbom3-1.fna&oh=00_AYD35FdGZ2ndiPriZYyWZDqQQNYaCCgh2tzxT1mluo5oow&oe=66EFE463"
        alt=""
        className="w-[50%] hidden md:block rounded-r-3xl object-cover "
      />
      <div className="w-full md:w-[50%] flex flex-col justify-center items-center p-8 md:p-12">
        <div>
          <a className="btn btn-ghost text-xl" href="/">
            <img
              src="https://ik.imagekit.io/ok2wgebfs/Untitled-2%202.png?updatedAt=1723876926038"
              alt=""
            />
          </a>
        </div>
        <>
          <h1 className="text-3xl font-bold mt-8">Welcome Admin</h1>
          <label className="form-control w-full max-w-md mt-2">
            <div className="label">
              <span className="label-text text-white text-lg mt-8">
                Username
              </span>
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                value={loginData.username}
                placeholder=""
                className="input input-bordered w-full border-[#CFCFCF] bg-transparent h-10 rounded-md focus:border-[#CFCFCF] text-black bg-white"
                name="username"
                onChange={handleLoginChange}
              />
            </div>
          </label>
          <label className="form-control w-full max-w-md mt-2">
            <div className="label">
              <span className="label-text text-white text-lg ">Password</span>
            </div>
            <div className="flex gap-3">
              <input
                type="password"
                value={loginData.password}
                placeholder=""
                className="input input-bordered w-full border-[#CFCFCF] bg-transparent h-10 rounded-md focus:border-[#CFCFCF] text-black bg-white"
                name="password"
                onChange={handleLoginChange}
              />
            </div>
          </label>
          <button
            className="bg-[#AB0A10] rounded-lg p-2 px-4 sm:px-6 text-white text-xs sm:text-sm h-10 mt-8 w-full md:w-2/3 mb-4 m-auto"
            onClick={handleLogin}
          >
            Login
          </button>
        </>
      </div>
    </div>
  );
}
