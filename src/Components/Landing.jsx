import React, { useEffect, useState } from "react";
import NavbarComp from "./NavbarComp";
import CurrentPlaying from "./CurrentPlaying";
import { useLocation, useNavigate } from "react-router-dom";
import { checkCookie, getCookie } from "./functions";

function ImageContainer({ imageUrl, sizeClass, name, onClick }) {
  const navigate = useNavigate();
  const isLogged = checkCookie();

  // Debugging: Check the image URL
  console.log("Image URL:", imageUrl);

  return (
    <div
      className={`${sizeClass} bg-cover bg-center transition-all duration-500 flex flex-col justify-end items-center py-4 cursor-pointer`}
      style={{ backgroundImage: `url("${imageUrl}")` }}
      onClick={onClick}
    >
      {sizeClass.includes("lg:w-72 lg:h-[380px]") && (
        <div className="transition-all scale-1 duration-200 flex flex-col justify-center w-full sm:w-60 px-4">
          <h1 className="text-base sm:text-lg font-semibold text-white text-center">
            {name.name}
          </h1>
          <button
            className="bg-[#AB0A10] rounded-lg p-2 px-4 sm:px-6 text-white text-xs sm:text-sm mt-2 w-24 sm:w-32 m-auto"
            onClick={(e) => {
              e.stopPropagation(); // Prevent the click event from bubbling up
              if (isLogged) {
                navigate("/theaters", {
                  state: {
                    name: name.name,
                    image: imageUrl,
                  },
                });
              } else {
                navigate("/login");
              }
            }}
          >
            Book Now
          </button>
        </div>
      )}
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  function preloadImages(urls) {
    urls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }
  const names = [
    { name: "Wonder Woman 1984", type: "Soon" },
    { name: "WandaVision", type: "Today" },
    { name: "Zack Snyder’s Justice League", type: "Today" },
    { name: "The Lion King", type: "Soon" },
    { name: "Godzolla vs. Kong", type: "Today" },
    { name: "Spirited away", type: "Today" },
  ];
  const images = [
    "https://ik.imagekit.io/ok2wgebfs/Movie/image(1).png?updatedAt=1724681484309",
    "https://ik.imagekit.io/ok2wgebfs/Movie/image(2).png?updatedAt=1724681484132",
    "https://ik.imagekit.io/ok2wgebfs/Movie/image(4).png?updatedAt=1724681484753",
    "https://ik.imagekit.io/ok2wgebfs/Movie/image(6).png?updatedAt=1724681492193",
    "https://ik.imagekit.io/ok2wgebfs/Movie/image(7).png?updatedAt=1724681493916",
    "https://ik.imagekit.io/ok2wgebfs/Movie/image.png?updatedAt=1724994693213",
  ];

  const backgroundImages = [
    "https://ik.imagekit.io/ok2wgebfs/Movie/image.png?updatedAt=1725004031711",
    "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/5525675DDD0ADAC6D5527A7E051241B2DB49578C204C32C9C097B67022EABFC8/scale?width=1200&aspectRatio=1.78&format=webp",
    "https://ik.imagekit.io/ok2wgebfs/Movie/image(5).png?updatedAt=1724681496241",
    "https://ik.imagekit.io/ok2wgebfs/Movie/image(8).png?updatedAt=1724681488831",
    "https://ik.imagekit.io/ok2wgebfs/Movie/image(9).png?updatedAt=1724681497647",
    "https://ik.imagekit.io/ok2wgebfs/Movie/image(10).png?updatedAt=1724681490596",
  ];

  const [selectedMovieIndex, setSelectedMovieIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    if (!checkCookie()) {
      navigate("/login");
    }
    preloadImages(backgroundImages);
    preloadImages(images);
    const intervalId = setInterval(() => {
      setSelectedMovieIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000);

    // Listen for window resize events
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", handleResize);
    };
  }, [images.length]);

  const handleImageClick = (index) => {
    setSelectedMovieIndex(index);
  };

  const getVisibleImages = () => {
    if (windowWidth < 640) {
      return images.slice(0, 6);
    } else if (windowWidth < 1400) {
      return images.slice(0, 5);
    } else {
      return images.slice(0, 6);
    }
  };

  const visibleImages = getVisibleImages();

  return (
    <>
      <div
        className="absolute h-[650px] md:h-[100vh] w-[100vw] bg-cover brightness-50 bg-center"
        style={{
          backgroundImage: `url('${backgroundImages[selectedMovieIndex]}')`,
        }}
      ></div>
      <div className=" h-[650px] md:h-[100vh] w-[100vw] flex flex-col justify-between relative mb-10">
        <NavbarComp />
        <div className="text-left">
          {names[selectedMovieIndex].type === "Today" && (
            <>
              <img
                src="https://ik.imagekit.io/ok2wgebfs/Movie/Group%2018312.png?updatedAt=1723970814549"
                className="w-40 lg:w-52 "
                alt=""
              />
              <img
                src="https://ik.imagekit.io/ok2wgebfs/Movie/Group%20298.png?updatedAt=1723970814812"
                className="w-32 lg:w-40 mt-2"
                alt=""
              />
            </>
          )}
          {names[selectedMovieIndex].type !== "Today" && (
            <>
              <img
                src="https://ik.imagekit.io/ok2wgebfs/Movie/Group%2018312.png?updatedAt=1723970814549"
                className="w-32 lg:w-40"
                alt=""
              />
              <img
                src="https://ik.imagekit.io/ok2wgebfs/Movie/Group%20298.png?updatedAt=1723970814812"
                className="w-40 lg:w-52 mt-2"
                alt=""
              />
            </>
          )}
        </div>
        <div className="p-4 sm:p-8 lg:p-16 flex justify-center lg:justify-between items-end gap-4 lg:gap-0 h-[400px]">
          {windowWidth < 640 &&
            visibleImages.map((imageUrl, index) => (
              <ImageContainer
                key={index}
                imageUrl={imageUrl}
                name={names[index]}
                sizeClass={
                  index === selectedMovieIndex
                    ? "w-[80%] h-[60vh] sm:w-48 sm:h-[250px] lg:w-72 lg:h-[380px]"
                    : "hidden"
                }
                onClick={() => handleImageClick(index)}
              />
            ))}
          {windowWidth > 640 &&
            visibleImages.map((imageUrl, index) => (
              <ImageContainer
                key={index}
                imageUrl={imageUrl}
                name={names[index]}
                sizeClass={
                  index === selectedMovieIndex
                    ? "w-40 h-[180px] sm:w-48 sm:h-[250px] lg:w-72 lg:h-[380px]"
                    : "w-32 h-[150px] sm:w-36 sm:h-[200px] lg:w-48 lg:h-[250px]"
                }
                onClick={() => handleImageClick(index)}
              />
            ))}
        </div>
      </div>
      <CurrentPlaying />
    </>
  );
}
