import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./Components/Landing";
import Booking from "./Components/Booking";
import "react-toastify/dist/ReactToastify.css";
import MyBookings from "./Components/MyBookings";
import LoginPage from "./Components/LoginPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/mybookings" element={<MyBookings />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
