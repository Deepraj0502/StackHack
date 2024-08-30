import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./Components/Landing";
import Booking from "./Components/Booking";
import "react-toastify/dist/ReactToastify.css";
import MyBookings from "./Components/MyBookings";
import LoginPage from "./Components/LoginPage";
import AdminLoginPage from "./Components/admin/AdminLoginPage";
import AdminDashboard from "./Components/admin/AdminDashboard";
import AdminUsers from "./Components/admin/AdminUsers";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/mybookings" element={<MyBookings />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
