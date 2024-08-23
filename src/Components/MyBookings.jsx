import React, { useEffect, useState } from "react";
import NavbarComp from "./NavbarComp";
import { ToastContainer, toast } from "react-toastify";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { PDFDownloadLink } from "@react-pdf/renderer";
import TicketPdf from "./TicketPdf";
import { RxCross2 } from "react-icons/rx";
import { getCookie } from "./functions";

export default function MyBookings() {
  const movies = [
    {
      name: "Wonder Woman 1984",
      image:
        "https://s3-alpha-sig.figma.com/img/2df5/9209/2824661a754120be5ce1e9832a9a3a4b?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VZvN7b0PbSxn-~BRnwjFjdEueQpIvBffcsw4pukuUXe3qyM8jF4L~Ei-0gSOU~OeTwYw4jX3M2fjCYA3e7nqAhEmSrUNE9jO7Um44xLOAhuU3vHtww9SYPrXZDSLNmSl7cR0XFAOyNxaSReaBBCIjo1qSwHC099~rGjRZhIJgdSAzr-CobtoGRY-E3LinQfD8QMM8FNY33YCetDYVHzpaSUtvURaf9M2gq4V3v-aByyLhncuqI8iwQyteOrUaGdfO3jwz2TGqDR8UiiV7plS-AGU7vs5w~FgvfIV2yMbNpHl7fiXVdQUDTXNqxYYHFv~Jmjxq3yy6ffwmYC7IATGhQ__",
    },
    {
      name: "WandaVision",
      image:
        "https://s3-alpha-sig.figma.com/img/7cce/c6d5/ff20f6efbca35d913207d917f8847cd1?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Q2x2ARwx2P8KAWC-lyxaTs9bwpMH3ceuQPOYmq9q3ZgqvFgcVPkqo~a9N3-oOJIKAjwNtcBDy8DWheEO5l9vclGpQ7yvNppkf-CpqSRAWW1fjqz3Db2LNLOqcFmDd0ZxF-OTKxAv4ZTrJ0Bdwji1YhVF0g8JA4YV0VIfvJax0IQXztbAdnanFVFyPGnbjIv9zpEPiQONPWHAgriY7X-qiSxJ3XWwGfrhDp0cIddWR0fKoSxsPu1NPejdSEonphBmTdSRUnbWm6lTWuUPSDumMZKCJ-8zckbj63uJJfnN1C2yuWDp69ZbKTOKmRYvFTQQEGXJQkZWvlM04NZLIob4Uw__",
    },
    {
      name: "Zack Snyder’s Justice League",
      image:
        "https://s3-alpha-sig.figma.com/img/5c3c/de33/38160fce9898e55297bfc818e70763eb?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=F0EjEqagMtKRTC1woRrB2bqfNOXorLfZReV3aHi7fUAX5KbxOG15UzXXdzJV-uMXBjdc2bVcm3Pklf8O0KKFamE7VWgCfKoM-d-ZoLalqObvcKAMhGg6SovT81pi9g3ZG6YzPXqg7FImTxbexrq2eIASO-B6Tl~8eFcKs78V-NtHJKspiZXVN0VwTptYyMsHX7bwnkPEo5vHfuYN1xo1iCCEn-CJxraB4E--T5QFN2xf8kq0LXttp-Mic07-nUiPg3Heans-nFOJqz66-8dsHW~r9FcEOTOF9HmYrIydw-x2FayspBDd9mJjEzbM45wNwC81mxsUlCOZh2jrgCY2zQ__",
    },
    {
      name: "The Lion King",
      image:
        "https://s3-alpha-sig.figma.com/img/3dc2/2208/cb29b6baa443860d13c60c2c35698418?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Jb4xbyernGl0t0OWVKFkATFFxZ0Uxgj0mNP8EgWEwHsOxaXoTKXQtnveb0OAOYCGX203Dv25vgETJEXrae40lkXuvpRZTvR3znt5ZjYUcZrskLv-f8HikcZ7HhpYmgTlmtI1TK8TQdJbjy2S17G~EzlYSxEHexgRAMTTf-rIxAZOjptcJWepPX4JCiAaiU548AjZNfsSlkd6Dz44OmRIl6h60qqJ3iEvYnWvFtK4qZEfrKZb~sap5GJCUa0gdRU-tyDV03wdOBYkTSb~JAnEO2pa3dfqddH05KpgvAhRbnKCWznnV3GVghLYNdx8PoRduukD6VxAfqcdYUwpKrUWWg__",
    },
    {
      name: "Godzolla vs. Kong",
      image:
        "https://s3-alpha-sig.figma.com/img/2eb2/239e/7c054a2f73f3a1edf28507549fc4c665?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YJokO4iRxVGVIWi6Bb4iUNqTmPSLJpYZzcSgrhWzM9v1Mw-d-IqiIVbwi4w8cG9Ys0HC8-gYOrHgvZi9eYoYVbL0gZZnYbC8JIIPoTRJ7rUP~xWQU6X7FY6FsdXRY~ZVurNgGDnrOPS9wCWk8Ky9CrLYxn-6CXr8Eaenju0QeTfIGrvzkdJoz9nZK34KV~u4Qy5wJ9EyoIaa-TlJthxWpsJ8ZWzljD1WEvfu0iiuM1xGSIJEfh9ugxihtAkBpEeIUC43eBjDF4KeI1Rw2Gt20fypV4vlJpOZMgiW72c9~eNOdinmkGoN-L2GVJKkNSFNVBqMd37ZmoUnEU1~x6ILxA__",
    },
    {
      name: "Spirited away",
      image:
        "https://s3-alpha-sig.figma.com/img/29c7/aef2/045fce8c5054f2e840205ea5a28c6968?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bfg0bR5yCtKwka1uNQ5sztYVpoF~8XDDODrPNg-Oqszza3AcCBD43L~eyw7hOTVrd28v9XJF78oPuPejZZWvPR56ppz5QxENVafJBysk75Y-48NycBW3vitpkP7-I5EyGDXZViGDfKIVu9RSUD7pEY9E31~FIWs~q1W4xt1snij-BPVeMRv3U0~5QCtNOxkh-dyd7-8NEC7EyhUhZAYWIGKTXSm83EiZ7YiAWpsrzNgsbyues9xZsHXqc-8P0brgD-CGkZwuAp~jwfZJIO2LQOoO4OPBmxPzANMCS96WcsasVJlvq1eG4yuotSw8RS~zLTWMkDu9MW~XaW1MG9FSJg__",
    },
  ];

  const email = JSON.parse(getCookie("user")).email;

  const [userBookings, setUserBookings] = useState([]);

  const handleCheck = async () => {
    if (!email) {
      toast.error("Enter email id");
      return;
    }

    try {
      const q = query(
        collection(db, "userBookings"),
        where("email", "==", email)
      );

      const querySnapshot = await getDocs(q);
      const bookings = querySnapshot.docs.map((doc) => doc.data());
      setUserBookings(bookings);
      console.log(bookings);

      if (bookings.length === 0) {
        toast.info("No bookings found for this email.");
      }
    } catch (error) {
      toast.error("Error fetching bookings. Please try again.");
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    handleCheck();
  }, []);

  return (
    <div className="w-full h-full">
      <ToastContainer />
      <NavbarComp />
      <div className="w-full flex flex-wrap-reverse">
        <div className="w-full md:w-1/2 p-4 md:p-20 md:h-[100vh] md:overflow-y-auto">
          <h1 className="mt-4 text-2xl font-bold">My Bookings</h1>

          {userBookings.length > 0 &&
            userBookings.map((data) => (
              <>
                <div
                  className={`rounded-lg p-4 border-[1px] mt-8 flex xl:h-[250px]`}
                >
                  <img
                    src={
                      movies.filter((e) => e.name === data.movieName)[0][
                        "image"
                      ]
                    }
                    alt="Movie Poster"
                    className="w-1/3 object-cover rounded-lg"
                  />
                  <div className="w-2/3 px-4">
                    <h1 className="text-2xl font-bold">{data.movieName}</h1>
                    <p className="text-md mt-2">Date: {data.showDate}</p>
                    <p className="text-md mt-2">Time: {data.showTime}</p>
                    <p className="text-md mt-2">
                      Seats: {data.selectedSeats.join(",")}
                    </p>
                    <PDFDownloadLink
                      document={
                        <TicketPdf
                          qrdata={data.qrData}
                          bookingData={{
                            date: data.showDate,
                            time: data.showTime,
                            booked: [],
                            selected: data.selectedSeats,
                            price: data.amount,
                            bookingId: data.bookingId,
                          }}
                          formData={{
                            name: data.username,
                            email: data.email,
                            phoneCode: "",
                            phoneLength: 10,
                            phoneNo: data.phoneNo,
                            promo: data.promo,
                            paymentType: data.paymentType,
                            cardNumber: data.cardNumber,
                            remember: false,
                            promoApplied: data.promo === "" ? false : true,
                            promoDiscount: data.promoDiscount,
                          }}
                          movieName={data.movieName}
                        />
                      }
                      fileName="Ticket.pdf"
                      className="w-full flex"
                    >
                      {({ blob, url, loading, error }) =>
                        loading ? (
                          <button className="bg-[#AB0A10] rounded-lg p-4 sm:px-6 text-white text-xs sm:text-sm mt-8 w-40 ">
                            Loading...
                          </button>
                        ) : (
                          <button className="bg-[#AB0A10] rounded-lg p-4 sm:px-6 text-white text-xs sm:text-sm mt-8 w-40">
                            Download Tickets
                          </button>
                        )
                      }
                    </PDFDownloadLink>
                  </div>
                </div>
              </>
            ))}
        </div>
        <div className="w-full md:w-1/2">
          <img
            src="https://img.freepik.com/free-vector/online-cinema-realistic-poster-with-screen-popcorn-3d-glasses-seats-vector-illustration_1284-77050.jpg?w=740&t=st=1724401133~exp=1724401733~hmac=89001bffbe26d3c562d79980a5ff30e33588e299bbc34fc537feee9ffff5c44b"
            alt="Cinema"
            className="h-48 md:h-screen w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
