import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./Components/Landing";
import Booking from "./Components/Booking";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
