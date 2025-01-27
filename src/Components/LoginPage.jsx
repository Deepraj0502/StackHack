import React, { useState } from "react";
import { signInWithGooglePopup, auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import { checkCookie, getCookie, setCookie } from "./functions";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function () {
  const navigate = useNavigate();
  const [type, setType] = useState("login");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [regData, setRegData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegChange = (e) => {
    setRegData({ ...regData, [e.target.name]: e.target.value });
  };

  const logGoogleUser = async () => {
    try {
      const response = await signInWithGooglePopup();
      const token = await response.user.getIdToken(); // Get the ID token
      setCookie("accessToken", token, response.user.expirationTime);
      setCookie(
        "user",
        JSON.stringify(response.user),
        response.user.expirationTime
      );
      const bookingRef3 = doc(db, "users", `${response.user.email}`);
      const bookingSnap3 = await getDoc(bookingRef3);

      if (!bookingSnap3.exists()) {
        await setDoc(bookingRef3, {
          email: response.user.email,
          username: response.user.displayName,
          phoneNo: response.user.phoneNumber,
          phoneCode: "+91",
          uid: response.user.uid,
        });
      }
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error("Google sign-in failed. Please try again.");
    }
  };

  const handleRegister = async () => {
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (regData.password !== regData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    } else if (!isValidEmail(regData.email)) {
      toast.error("Enter a valid email");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        regData.email,
        regData.password
      );

      const user = userCredential.user;
      console.log(user);

      const bookingRef3 = doc(db, "users", `${user.email}`);
      const bookingSnap3 = await getDoc(bookingRef3);

      if (!bookingSnap3.exists()) {
        await setDoc(bookingRef3, {
          email: user.email,
          username: user.displayName,
          phoneNo: user.phoneNumber,
          phoneCode: "+91",
          uid: user.uid,
        });
      }
      const token = await user.getIdToken(); // Get the ID token
      toast.success("Registration successful");
      setCookie("accessToken", token, user.refreshToken); // Use refreshToken for expiration
      setCookie("user", JSON.stringify(user), user.expirationTime);
      navigate("/");
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );
      const user = userCredential.user;
      const bookingRef3 = doc(db, "users", `${user.email}`);
      const bookingSnap3 = await getDoc(bookingRef3);

      if (!bookingSnap3.exists()) {
        await setDoc(bookingRef3, {
          email: user.email,
          username: user.displayName,
          phoneNo: user.phoneNumber,
          phoneCode: "+91",
          uid: user.uid,
        });
      }
      const token = await user.getIdToken(); // Get the ID token
      toast.success("Login successful");
      setCookie("accessToken", token, user.refreshToken); // Use refreshToken for expiration
      setCookie("user", JSON.stringify(user), user.expirationTime);
      navigate("/");
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
        src="https://www.marannetwork.com/wp-content/uploads/2021/07/Movice-Poster-Material-psd-file.jpg"
        alt=""
        className="w-[50%] hidden md:block rounded-r-3xl object-cover "
      />
      <div className="w-full md:w-[50%] flex flex-col justify-center items-center p-8 md:p-12">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl" href="/">
            <img
              src="https://ik.imagekit.io/ok2wgebfs/Untitled-2%202.png?updatedAt=1723876926038"
              alt=""
            />
          </a>
        </div>
        {type === "login" && (
          <>
            <h1 className="text-3xl font-bold mt-8 md:mt-0">Welcome Back</h1>
            <label className="form-control w-full max-w-md mt-2">
              <div className="label">
                <span className="label-text text-white text-lg mt-8">
                  Email
                </span>
              </div>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={loginData.email}
                  placeholder=""
                  className="input input-bordered w-full border-[#CFCFCF] bg-transparent h-10 rounded-md focus:border-[#CFCFCF] text-black bg-white"
                  name="email"
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
            <div className="relative w-full text-center">
              <p className="absolute left-[45%] md:left-[48%] mt-5 md:mt-4 bg-black font-semibold md:text-xl w-10">
                OR
              </p>
              <hr className="border-[0.1px] mt-8 mb-8 border-white w-full md:w-2/3 mx-auto" />
            </div>
            <button
              onClick={logGoogleUser}
              className="bg-white border py-2 w-full md:w-2/3 rounded-lg mt-5 flex justify-center items-center text-sm text-black"
            >
              <svg
                class="mr-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="25px"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
              Sign In With Google
            </button>
            <p className="font-semibold mt-4">
              Don't have an account?{" "}
              <span
                className="text-[#AB0A10] cursor-pointer"
                onClick={() => setType("register")}
              >
                Register
              </span>
            </p>
          </>
        )}
        {type === "register" && (
          <>
            <label className="form-control w-full max-w-md mt-2">
              <div className="label">
                <span className="label-text text-white text-lg mt-8">
                  Email
                </span>
              </div>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={regData.email}
                  placeholder=""
                  className="input input-bordered w-full border-[#CFCFCF] bg-transparent h-10 rounded-md focus:border-[#CFCFCF] text-black bg-white"
                  name="email"
                  onChange={handleRegChange}
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
                  value={regData.password}
                  placeholder=""
                  className="input input-bordered w-full border-[#CFCFCF] bg-transparent h-10 rounded-md focus:border-[#CFCFCF] text-black bg-white"
                  name="password"
                  onChange={handleRegChange}
                />
              </div>
            </label>
            <label className="form-control w-full max-w-md mt-2">
              <div className="label">
                <span className="label-text text-white text-lg ">
                  Confirm Password
                </span>
              </div>
              <div className="flex gap-3">
                <input
                  type="password"
                  value={regData.confirmPassword}
                  placeholder=""
                  className="input input-bordered w-full border-[#CFCFCF] bg-transparent h-10 rounded-md focus:border-[#CFCFCF] text-black bg-white"
                  name="confirmPassword"
                  onChange={handleRegChange}
                />
              </div>
            </label>
            <button
              className="bg-[#AB0A10] rounded-lg p-2 px-4 sm:px-6 text-white text-xs sm:text-sm h-10 mt-8 w-full md:w-2/3 mb-4 m-auto"
              onClick={handleRegister}
            >
              Register
            </button>
            <div className="relative w-full text-center">
              <p className="absolute left-[45%] md:left-[48%] mt-5 md:mt-4 bg-black font-semibold md:text-xl w-10">
                OR
              </p>
              <hr className="border-[0.1px] mt-8 mb-8 border-white w-full md:w-2/3 mx-auto" />
            </div>
            <button
              onClick={logGoogleUser}
              className="bg-white border py-2 w-full md:w-2/3 rounded-lg mt-5 flex justify-center items-center text-sm text-black"
            >
              <svg
                class="mr-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="25px"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
              Sign Up With Google
            </button>
            <p className="font-semibold mt-4">
              Already have an account?{" "}
              <span
                className="text-[#AB0A10] cursor-pointer"
                onClick={() => setType("login")}
              >
                Login
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
