import React, { useEffect, useState } from "react";
import NavbarComp from "./NavbarComp";
import { IoIosArrowRoundForward } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useLocation } from "react-router-dom";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import { IoCardOutline } from "react-icons/io5";
import { PDFDownloadLink } from "@react-pdf/renderer";
import QRCode from "qrcode";
import TicketPdf from "./TicketPdf";
import emailjs from "@emailjs/browser";
import { getCookie } from "./functions";

export default function Booking() {
  const location = useLocation();
  const user = JSON.parse(getCookie("user"));
  const moviePrice = 250;
  function getNext7Days() {
    const today = new Date();
    const next7Days = [];

    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
      next7Days.push(nextDay.toISOString().slice(0, 10));
    }

    return next7Days;
  }
  const next7Days = getNext7Days();
  console.log(next7Days);

  const seatRows = ["A", "B", "C", "D", "E", "F", "G"];

  const [bookingData, setBookingData] = useState({
    date: next7Days[0],
    time: "",
    booked: [],
    selected: [],
    price: 0,
    bookingId: Math.floor(100000 + Math.random() * 900000),
  });

  const [formData, setFormData] = useState({
    name: "",
    email: user.email,
    phoneCode: "",
    phoneLength: 10,
    phoneNo: "",
    promo: "",
    paymentType: "Visa bank card",
    cardNumber: "",
    remember: false,
    promoApplied: false,
    promoDiscount: 0,
  });
  const [timings, setTimings] = useState([]);

  const getUpcomingTimings = (selectedDate) => {
    const nowUTC = new Date(new Date().toISOString());
    const currentTime =
      nowUTC.getHours().toString().padStart(2, "0") +
      ":" +
      nowUTC.getMinutes().toString().padStart(2, "0");

    let upcomingTimings = ["08:00", "13:30", "16:00", "20:30", "22:00"];
    if (selectedDate === next7Days[0]) {
      upcomingTimings = upcomingTimings.filter((time) => time > currentTime);
    }
    return upcomingTimings;
  };

  useEffect(() => {
    setTimings(getUpcomingTimings(bookingData.date));
  }, [bookingData.date]); // Update timings when date changes

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getBookings() {
      console.log(bookingData);

      const bookingRef = doc(
        db,
        "bookings",
        `${location.state.name}_${bookingData.date}_${bookingData.time}`
      );
      const bookingSnap = await getDoc(bookingRef);
      if (bookingSnap.exists()) {
        setBookingData({ ...bookingData, booked: bookingSnap.data().seats });
      } else {
        setBookingData({ ...bookingData, booked: [] });
      }
    }
    getBookings();
  }, [bookingData.date, bookingData.time]);

  const handlePurchase = async () => {
    if (bookingData.date === "" && bookingData.time === "") {
      toast.error("Invalid date and time");
      return;
    } else if (bookingData.price === 0) {
      toast.error("Select atleast one seat");
      return;
    }
    setShowForm(true);
  };

  const handlePromo = () => {
    if (!formData.promoApplied) {
      if (formData.promo === "GET50") {
        toast.success("Discount added of Rs.50");
        setBookingData({ ...bookingData, price: bookingData.price - 50 });
        setFormData({ ...formData, promoApplied: true, promoDiscount: 50 });
      }
    }
  };

  useEffect(() => {
    async function getUserData() {
      const bookingRef3 = doc(db, "users", `${formData.email}`);
      const bookingSnap3 = await getDoc(bookingRef3);

      if (bookingSnap3.exists()) {
        setFormData({
          ...formData,
          name: bookingSnap3.data().username,
          phoneCode: bookingSnap3.data().phoneCode,
          phoneNo: bookingSnap3.data().phoneNo,
          cardNumber: bookingSnap3.data().cardNumber,
          phoneLength: bookingSnap3.data().phoneNo.length,
        });
      }
    }
    getUserData();
  }, [formData.email]);

  const handleFormSubmit = async () => {
    const isValidEmail = (email) => {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(email);
    };
    if (
      formData.name === "" &&
      formData.email === "" &&
      formData.phoneCode === "" &&
      formData.phoneNo === "" &&
      formData.cardNumber === ""
    ) {
      toast.error("Enter all fields");
      return;
    } else if (formData.phoneLength !== formData.phoneNo.length) {
      toast.error("Enter valid phone number");
      return;
    } else if (!isValidEmail(formData.email)) {
      toast.error("Enter valid email id");
      return;
    } else if (formData.phoneCode[0] !== "+") {
      toast.error("Enter valid country code");
      return;
    }
    setLoading(true);
    try {
      const bookingRef = doc(
        db,
        "userBookings",
        `${formData.email}_${location.state.name}_${new Date().toISOString()}`
      );

      await setDoc(bookingRef, {
        bookingId: bookingData.bookingId,
        movieName: location.state.name,
        showTime: bookingData.time,
        showDate: bookingData.date,
        username: formData.name,
        email: formData.email,
        phoneNo: formData.phoneCode + " " + formData.phoneNo,
        promo: formData.promo,
        paymentType: formData.paymentType,
        cardNumber: formData.remember ? formData.cardNumber : "",
        selectedSeats: bookingData.selected,
        amount: bookingData.price + (0.12 * bookingData.price + 10),
        qrData: qrCodeData,
        promoDiscount: formData.promoDiscount,
      });
      const bookingRef2 = doc(
        db,
        "bookings",
        `${location.state.name}_${bookingData.date}_${bookingData.time}`
      );
      const bookingSnap2 = await getDoc(bookingRef2);

      let bookedSeats = [];
      if (bookingSnap2.exists()) {
        bookedSeats = bookingSnap2.data().seats;
      }

      // Combine the already booked seats with the newly selected seats
      const updatedSeats = [
        ...new Set([...bookedSeats, ...bookingData.selected]),
      ];

      await setDoc(bookingRef2, {
        movieName: location.state.name,
        showTime: bookingData.time,
        showDate: bookingData.date,
        seats: updatedSeats,
      });

      const bookingRef3 = doc(db, "users", `${formData.email}`);
      const bookingSnap3 = await getDoc(bookingRef3);

      if (!bookingSnap3.exists()) {
        await setDoc(bookingRef3, {
          email: formData.email,
          cardNumber: formData.cardNumber,
          username: formData.name,
          phoneNo: formData.phoneNo,
          phoneCode: formData.phoneCode,
        });
      }

      emailjs
        .send(
          "service_ws6ly6s",
          "template_n0dmyjp",
          {
            userName: formData.name,
            movieName: location.state.name,
            date: bookingData.date,
            time: bookingData.time,
            seats: bookingData.selected.join(","),
            bookingId: bookingData.bookingId,
            email: formData.email,
          },
          "OO0fXwarl7kOsQOH9"
        )
        .then(() => {
          setLoading(false);
          toast.success("Payment Successful");
          setSuccess(true);
        })
        .catch((error) => {
          console.error("Failed to send email:", error); // Use console.error for errors
          setLoading(false); // Ensure loading state is set to false even if there's an error
          toast.error("Failed to send email. Please try again."); // Notify the user
        });
    } catch (error) {
      console.error("Error booking seats: ", error);
    }
  };

  const [qrCodeData, setQrCodeData] = React.useState(null);

  React.useEffect(() => {
    // Generate QR code data
    QRCode.toDataURL(
      JSON.stringify({
        movie: location.state.name,
        date: bookingData.date,
        time: bookingData.time,
        username: formData.name,
        seats: bookingData.selected,
      }),
      { width: 300, margin: 1 },
      (err, url) => {
        if (err) return console.error(err);
        setQrCodeData(url);
      }
    );
  }, []);

  const handlePayment = () => {
    console.log(bookingData);

    const options = {
      key: "rzp_test_8zYUhIDCoi8TRr",
      amount: (bookingData.price + (0.12 * bookingData.price + 10)) * 100,
      currency: "INR",
      name: "Nizami",
      description: "Test Transaction",
      handler: function (response) {
        // Handle successful payment here

        emailjs
          .send(
            "service_ws6ly6s",
            "template_n0dmyjp",
            {
              userName: formData.name,
              movieName: location.state.name,
              date: bookingData.date,
              time: bookingData.time,
              seats: bookingData.selected.join(","),
              bookingId: bookingData.bookingId,
              email: formData.email,
            },
            "OO0fXwarl7kOsQOH9"
          )
          .then(() => {
            setLoading(false);
            toast.success("Payment Successful");
            setSuccess(true);
          })
          .catch((error) => {
            console.error("Failed to send email:", error); // Use console.error for errors
            setLoading(false); // Ensure loading state is set to false even if there's an error
            toast.error("Failed to send email. Please try again."); // Notify the user
          });
        // alert(`Payment ID: ${response.razorpay_payment_id}`);
        // alert(`Order ID: ${response.razorpay_order_id}`);
        // alert(`Signature: ${response.razorpay_signature}`);
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phoneNo,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      <ToastContainer />
      <NavbarComp />
      {showForm && (
        <div className="w-[100vw] h-[100vh] fixed z-40 flex justify-center items-center">
          {loading && (
            <img
              src="https://cullenk.github.io/Movie-Game-Show-App/images/movie-loading.gif"
              alt=""
              className="absolute z-40 w-60 rounded-xl"
            />
          )}
          {!showSuccess && (
            <div className="bg-white p-4 flex flex-col items-center relative w-[90%] md:w-[500px] rounded-md max-h-[95vh] overflow-scroll">
              <RxCross2
                className="absolute top-5 left-[93%] w-5 h-5 text-[#787878] cursor-pointer"
                onClick={() => {
                  setShowForm(false);
                }}
              />
              <h1 className="text-black font-semibold text-xl mt-4">ORDER</h1>
              <label className="form-control w-full max-w-md mt-4">
                <div className="label">
                  <span className="label-text text-black text-md font-semibold">
                    Name and surname
                    <span className="relative text-red-500 text-sm bottom-0 left-1">
                      *
                    </span>
                  </span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full border-[#CFCFCF] bg-transparent h-10 rounded-md focus:border-[#CFCFCF] text-black"
                  value={formData.name}
                  name="name"
                  onChange={handleFormChange}
                />
              </label>
              <label className="form-control w-full max-w-md mt-2">
                <div className="label">
                  <span className="label-text text-black text-md font-semibold">
                    Email
                    <span className="relative text-red-500 text-sm bottom-0 left-1">
                      *
                    </span>
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.email}
                  className="input input-bordered w-full border-[#CFCFCF] bg-transparent h-10 rounded-md focus:border-[#CFCFCF] text-black"
                  name="email"
                  onChange={handleFormChange}
                />
              </label>
              <label className="form-control w-full max-w-md mt-2">
                <div className="label">
                  <span className="label-text text-black text-md font-semibold">
                    Promo
                  </span>
                </div>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={formData.promo}
                    placeholder="GET50"
                    className="input input-bordered w-full border-[#CFCFCF] bg-transparent h-10 rounded-md focus:border-[#CFCFCF] text-black"
                    name="promo"
                    onChange={handleFormChange}
                  />
                  <button
                    className="bg-[#AB0A10] rounded-md h-10 p-2 pt-1 px-4 sm:px-6 text-white text-xs sm:text-sm w-40 m-auto"
                    onClick={handlePromo}
                  >
                    Apply
                  </button>
                </div>
              </label>
              <label className="form-control w-full max-w-md mt-2">
                <div className="label">
                  <span className="label-text text-black text-md font-semibold">
                    Phone Number{" "}
                    <span className="relative text-red-500 text-sm bottom-0 left-1">
                      *
                    </span>
                  </span>
                </div>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={formData.phoneCode}
                    placeholder="+91"
                    className="input input-bordered w-20 border-[#CFCFCF] bg-transparent h-10 rounded-md focus:border-[#CFCFCF] text-black"
                    name="phoneCode"
                    onChange={handleFormChange}
                  />
                  <select
                    className="select w-20 border border-[#CFCFCF] bg-transparent text-black !h-10 min-h-0 rounded-md focus:border-[#CFCFCF]"
                    name="phoneLength"
                    value={formData.phoneLength}
                    onChange={handleFormChange}
                  >
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option selected value={10}>
                      10
                    </option>
                    <option value={11}>11</option>
                    <option value={12}>12</option>
                    <option value={13}>13</option>
                  </select>
                  <input
                    type="text"
                    placeholder="8879869667"
                    className="input input-bordered w-full border-[#CFCFCF] bg-transparent h-10 rounded-md focus:border-[#CFCFCF] text-black"
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={handleFormChange}
                  />
                </div>
              </label>
              <label className="form-control w-full max-w-md mt-2">
                <div className="label">
                  <span className="label-text text-black text-md font-semibold">
                    Payment
                    <span className="relative text-red-500 text-sm bottom-0 left-1">
                      *
                    </span>
                  </span>
                </div>
                <select
                  className="select w-full border border-[#CFCFCF] bg-transparent text-black !h-10 min-h-0 rounded-md focus:border-[#CFCFCF]"
                  name="paymentType"
                  value={formData.paymentType}
                  onChange={handleFormChange}
                >
                  <option selected value="Visa bank card">
                    Visa bank card
                  </option>
                  <option selected value="RazorPay">
                    RazorPay
                  </option>
                </select>
                {formData.paymentType !== "RazorPay" && (
                  <>
                    <div className="relative">
                      <IoCardOutline className="absolute top-[45%] left-[92%] text-[#4D4D4D] w-6 h-6" />
                      <input
                        type="text"
                        className="input mt-4 input-bordered w-full border-[#CFCFCF] bg-transparent h-10 rounded-md focus:border-[#CFCFCF] text-black"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleFormChange}
                      />
                    </div>

                    <div className="form-control w-max m-auto mt-4">
                      <label className="label cursor-pointer text-[#6E6E6E]">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary w-4 h-4 rounded-sm bg-[#D0D0D0] border-0 mt-[2px]"
                          name="remember"
                          onChange={() => {
                            setFormData({
                              ...formData,
                              remember: !formData.remember,
                            });
                          }}
                        />
                        <span className="label-text text-[#6E6E6E] font-semibold ml-3">
                          Remember my card information
                        </span>
                      </label>
                    </div>
                  </>
                )}
              </label>

              <button
                className="bg-[#8D090D] rounded-lg p-2 px-4 sm:px-6 text-white text-xs sm:text-sm mt-4 w-max mb-4 m-auto"
                onClick={
                  formData.paymentType === "RazorPay"
                    ? handlePayment
                    : handleFormSubmit
                }
              >
                Purchase (₹
                {bookingData.price +
                  "+ ₹" +
                  (0.12 * bookingData.price + 10) +
                  " Tax"}
                )
              </button>
            </div>
          )}
          {showSuccess && (
            <div className="bg-white p-4 flex flex-col items-center relative w-[90%] md:w-[450px] rounded-md max-h-[95vh] overflow-scroll">
              <RxCross2
                className="absolute top-5 left-[90%] w-5 h-5 text-[#787878] cursor-pointer"
                onClick={() => {
                  setSuccess(false);
                  setShowForm(false);
                  window.location.href = "/";
                }}
              />
              <h1 className="text-black font-semibold text-xl mt-8">
                Congratulations!
              </h1>
              <p className="text-md w-[80%] text-[#4C4C4C] text-center mt-6">
                Your’ve bought two tickets. Please, save it on your device and
                show before the entering to the theatre
              </p>

              <PDFDownloadLink
                document={
                  <TicketPdf
                    qrdata={qrCodeData}
                    bookingData={bookingData}
                    formData={formData}
                    movieName={location.state.name}
                  />
                }
                fileName="Ticket.pdf"
                className="w-full flex"
              >
                {({ blob, url, loading, error }) =>
                  loading ? (
                    <button className="bg-[#8D090D] rounded-lg p-2 px-4 sm:px-6 text-white text-xs sm:text-sm mt-8 w-60 mb-4 m-auto">
                      Loading...
                    </button>
                  ) : (
                    <button className="bg-[#8D090D] rounded-lg p-2 px-4 sm:px-6 text-white text-xs sm:text-sm mt-8 w-60 mb-4 m-auto">
                      Save Tickets
                    </button>
                  )
                }
              </PDFDownloadLink>
            </div>
          )}
        </div>
      )}
      <img
        src={location.state.image}
        alt=""
        className="w-full h-[250px] object-cover md:hidden"
      />
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
          {bookingData.selected.length > 0 && (
            <div className="flex justify-center mt-4 ">
              <div className="p-8 bg-[#121212] md:w-[90%] xl:w-[70%] flex flex-col items-center max-h-[400px] overflow-scroll">
                <h1 className="uppercase text-white">Selected seats</h1>

                <div>
                  {bookingData.selected.map((data) => (
                    <div className="flex mt-4 items-center gap-4">
                      <div className="p-2 w-4 h-4 bg-[#A4A4A4] rounded-full text-white cursor-pointer hover:bg-[#8D090D] mt-1"></div>
                      <p className="font-semibold w-32 text-white">
                        {data[0]} row / {data.slice(1)} seat
                      </p>
                      <p className="font-semibold max-w-20 text-white">
                        ₹{moviePrice}
                      </p>
                      <RxCross2
                        className="text-[#787878] mt-1 ml-2 cursor-pointer"
                        onClick={() => {
                          setBookingData({
                            ...bookingData,
                            selected: bookingData.selected.filter(
                              (data2) => data2 !== data
                            ),
                            price: bookingData.price - moviePrice,
                          });
                        }}
                      />
                    </div>
                  ))}
                </div>
                <button
                  className="bg-[#8D090D] rounded-lg p-2 px-4 sm:px-6 text-white text-xs sm:text-sm mt-8 w-40 m-auto"
                  onClick={handlePurchase}
                >
                  Purchase (₹{bookingData.price})
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="w-full md:w-[70%] lg:w-[60%] xl:w-[50%] flex flex-col items-center md:justify-center px-8 py-8 md:py-0">
          {/* Select Date */}
          <h1 className="font-semibold text-xl">Date</h1>
          <div className="flex justify-evenly gap-4 mt-4 border-0 border-b-[1px] pb-10 border-[#525252]">
            {next7Days.map((date) => (
              <div
                className={
                  bookingData.date !== date
                    ? "p-2 bg-[#2B2B2B] rounded-full text-white cursor-pointer pt-1.5 hover:bg-[#8D090D]"
                    : "p-2 bg-[#8D090D] rounded-full text-white cursor-pointer pt-1.5"
                }
                onClick={() => {
                  setBookingData({
                    ...bookingData,
                    date: date,
                    selected: [],
                    price: 0,
                  });
                  setTimings(() => {
                    getUpcomingTimings(date);
                  });
                }}
              >
                {date.slice(8)}
              </div>
            ))}
          </div>
          {/* Select Time */}
          <h1 className="font-semibold text-xl mt-4">Time</h1>
          <div className="flex justify-evenly gap-4 h-16 mt-4 border-0 border-b-[1px] pb-10 border-[#525252] flex-wrap">
            {timings !== undefined &&
              timings.map((time) => (
                <div
                  className={
                    bookingData.time !== time
                      ? "p-2 bg-[#2B2B2B] rounded-full text-white cursor-pointer pt-1.5 hover:bg-[#8D090D]"
                      : "p-2 bg-[#8D090D] rounded-full text-white cursor-pointer pt-1.5"
                  }
                  onClick={() => {
                    setBookingData({
                      ...bookingData,
                      time: time,
                      selected: [],
                      price: 0,
                    });
                  }}
                >
                  {time}
                </div>
              ))}
          </div>
          {/* Seat Selector */}
          <div className="w-[300px] md:w-[415px] mt-8">
            <img
              src="https://ik.imagekit.io/ok2wgebfs/Movie/LIGHT.png?updatedAt=1723985062684"
              alt=""
              className="w-[90%] m-auto"
            />
            <div className="flex mt-[-50px]">
              <div className="w-[5%]">
                {seatRows.reverse().map((rows) => (
                  <p className="text-center">{rows}</p>
                ))}
              </div>
              <div className="w-[90%] flex flex-col justify-between">
                {[...Array(7)].map((e, ind) => (
                  <div className="flex gap-1 items-center justify-center">
                    {[
                      ...Array(
                        ind === 0 ? 6 : ind === 1 ? 8 : ind === 2 ? 10 : 13
                      ),
                    ].map((e, ind2) => (
                      <div
                        className={
                          bookingData.selected.filter(
                            (data) => data === seatRows[ind] + (ind2 + 1)
                          ).length !== 0
                            ? "p-2 md:p-2.5 rounded-full text-white cursor-pointer bg-[#8D090D]"
                            : bookingData.booked.filter(
                                (data) => data === seatRows[ind] + (ind2 + 1)
                              ).length !== 0
                            ? "p-2 md:p-2.5 bg-[#2B2B2B] rounded-full text-white cursor-not-allowed"
                            : "p-2 md:p-2.5 bg-[#A4A4A4] rounded-full text-white cursor-pointer hover:bg-[#8D090D]"
                        }
                        onClick={() => {
                          if (
                            bookingData.booked.filter(
                              (data) => data === seatRows[ind] + (ind2 + 1)
                            ).length === 0
                          ) {
                            setBookingData({
                              ...bookingData,
                              selected: [
                                ...bookingData.selected,
                                seatRows[ind] + (ind2 + 1),
                              ],
                              price: bookingData.price + moviePrice,
                            });
                          }
                        }}
                      ></div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="w-[5%] text-[#4A4A4A]">
                {seatRows.map((rows) => (
                  <p className="text-center">{rows}</p>
                ))}
              </div>
            </div>
            <div className="flex mt-4 justify-center gap-8">
              <div className="flex gap-2 items-center">
                <div className="p-2 h-2 bg-[#A4A4A4] rounded-full text-white"></div>
                <p className="text-sm">Available</p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="p-2 h-2 bg-[#2B2B2B] rounded-full text-white"></div>
                <p className="text-sm">Booked</p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="p-2 h-2 bg-[#8D090D] rounded-full text-white"></div>
                <p className="text-sm">Selected</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-2 px-4 bg-[#8D090D] w-full flex justify-between items-center md:hidden">
        <h1 className="font-bold text-lg">₹{bookingData.price}</h1>
        <button
          className="bg-black rounded-md p-2 px-8 sm:px-6 text-white text-sm gap-1 flex items-center"
          onClick={handlePurchase}
        >
          Proceed <IoIosArrowRoundForward className="w-6 h-6" />
        </button>
      </div>
    </>
  );
}
