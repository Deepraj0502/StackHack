"use client";
import React, { useEffect, useState } from "react";
import NavbarComp from "./NavbarComp";
import CurrentPlaying from "./CurrentPlaying";

function ImageContainer({ imageUrl, sizeClass, name, onClick }) {
  return (
    <div
      className={`${sizeClass} bg-cover bg-center transition-all duration-500 flex flex-col justify-end items-center py-4 cursor-pointer`}
      style={{ backgroundImage: `url(${imageUrl})` }}
      onClick={onClick}
    >
      {sizeClass.includes("lg:w-72 lg:h-[380px]") && (
        <div className="transition-all scale-1 duration-200 flex flex-col justify-center w-full sm:w-60 px-4">
          <h1 className="text-base sm:text-lg font-semibold text-white text-center">
            {name.name}
          </h1>
          <button className="bg-[#AB0A10] rounded-lg p-2 px-4 sm:px-6 text-white text-xs sm:text-sm mt-2 w-24 sm:w-32 m-auto">
            Book Now
          </button>
        </div>
      )}
    </div>
  );
}

export default function Landing() {
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
    "https://s3-alpha-sig.figma.com/img/2df5/9209/2824661a754120be5ce1e9832a9a3a4b?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VZvN7b0PbSxn-~BRnwjFjdEueQpIvBffcsw4pukuUXe3qyM8jF4L~Ei-0gSOU~OeTwYw4jX3M2fjCYA3e7nqAhEmSrUNE9jO7Um44xLOAhuU3vHtww9SYPrXZDSLNmSl7cR0XFAOyNxaSReaBBCIjo1qSwHC099~rGjRZhIJgdSAzr-CobtoGRY-E3LinQfD8QMM8FNY33YCetDYVHzpaSUtvURaf9M2gq4V3v-aByyLhncuqI8iwQyteOrUaGdfO3jwz2TGqDR8UiiV7plS-AGU7vs5w~FgvfIV2yMbNpHl7fiXVdQUDTXNqxYYHFv~Jmjxq3yy6ffwmYC7IATGhQ__",
    "https://s3-alpha-sig.figma.com/img/7cce/c6d5/ff20f6efbca35d913207d917f8847cd1?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Q2x2ARwx2P8KAWC-lyxaTs9bwpMH3ceuQPOYmq9q3ZgqvFgcVPkqo~a9N3-oOJIKAjwNtcBDy8DWheEO5l9vclGpQ7yvNppkf-CpqSRAWW1fjqz3Db2LNLOqcFmDd0ZxF-OTKxAv4ZTrJ0Bdwji1YhVF0g8JA4YV0VIfvJax0IQXztbAdnanFVFyPGnbjIv9zpEPiQONPWHAgriY7X-qiSxJ3XWwGfrhDp0cIddWR0fKoSxsPu1NPejdSEonphBmTdSRUnbWm6lTWuUPSDumMZKCJ-8zckbj63uJJfnN1C2yuWDp69ZbKTOKmRYvFTQQEGXJQkZWvlM04NZLIob4Uw__",
    "https://s3-alpha-sig.figma.com/img/5c3c/de33/38160fce9898e55297bfc818e70763eb?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=F0EjEqagMtKRTC1woRrB2bqfNOXorLfZReV3aHi7fUAX5KbxOG15UzXXdzJV-uMXBjdc2bVcm3Pklf8O0KKFamE7VWgCfKoM-d-ZoLalqObvcKAMhGg6SovT81pi9g3ZG6YzPXqg7FImTxbexrq2eIASO-B6Tl~8eFcKs78V-NtHJKspiZXVN0VwTptYyMsHX7bwnkPEo5vHfuYN1xo1iCCEn-CJxraB4E--T5QFN2xf8kq0LXttp-Mic07-nUiPg3Heans-nFOJqz66-8dsHW~r9FcEOTOF9HmYrIydw-x2FayspBDd9mJjEzbM45wNwC81mxsUlCOZh2jrgCY2zQ__",
    "https://s3-alpha-sig.figma.com/img/3dc2/2208/cb29b6baa443860d13c60c2c35698418?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Jb4xbyernGl0t0OWVKFkATFFxZ0Uxgj0mNP8EgWEwHsOxaXoTKXQtnveb0OAOYCGX203Dv25vgETJEXrae40lkXuvpRZTvR3znt5ZjYUcZrskLv-f8HikcZ7HhpYmgTlmtI1TK8TQdJbjy2S17G~EzlYSxEHexgRAMTTf-rIxAZOjptcJWepPX4JCiAaiU548AjZNfsSlkd6Dz44OmRIl6h60qqJ3iEvYnWvFtK4qZEfrKZb~sap5GJCUa0gdRU-tyDV03wdOBYkTSb~JAnEO2pa3dfqddH05KpgvAhRbnKCWznnV3GVghLYNdx8PoRduukD6VxAfqcdYUwpKrUWWg__",
    "https://s3-alpha-sig.figma.com/img/2eb2/239e/7c054a2f73f3a1edf28507549fc4c665?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YJokO4iRxVGVIWi6Bb4iUNqTmPSLJpYZzcSgrhWzM9v1Mw-d-IqiIVbwi4w8cG9Ys0HC8-gYOrHgvZi9eYoYVbL0gZZnYbC8JIIPoTRJ7rUP~xWQU6X7FY6FsdXRY~ZVurNgGDnrOPS9wCWk8Ky9CrLYxn-6CXr8Eaenju0QeTfIGrvzkdJoz9nZK34KV~u4Qy5wJ9EyoIaa-TlJthxWpsJ8ZWzljD1WEvfu0iiuM1xGSIJEfh9ugxihtAkBpEeIUC43eBjDF4KeI1Rw2Gt20fypV4vlJpOZMgiW72c9~eNOdinmkGoN-L2GVJKkNSFNVBqMd37ZmoUnEU1~x6ILxA__",
    "https://s3-alpha-sig.figma.com/img/29c7/aef2/045fce8c5054f2e840205ea5a28c6968?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bfg0bR5yCtKwka1uNQ5sztYVpoF~8XDDODrPNg-Oqszza3AcCBD43L~eyw7hOTVrd28v9XJF78oPuPejZZWvPR56ppz5QxENVafJBysk75Y-48NycBW3vitpkP7-I5EyGDXZViGDfKIVu9RSUD7pEY9E31~FIWs~q1W4xt1snij-BPVeMRv3U0~5QCtNOxkh-dyd7-8NEC7EyhUhZAYWIGKTXSm83EiZ7YiAWpsrzNgsbyues9xZsHXqc-8P0brgD-CGkZwuAp~jwfZJIO2LQOoO4OPBmxPzANMCS96WcsasVJlvq1eG4yuotSw8RS~zLTWMkDu9MW~XaW1MG9FSJg__",
  ];

  const backgroundImages = [
    "https://s3-alpha-sig.figma.com/img/d986/4de5/893f0625b2e6261331ac76e6861e2841?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=REUYAWeZB8-nuAuG~TeMvD8SCKLo93soAVR~2cDGld~xPKK9UF~HDHxyJ~B3vWekNmDDX-MWbSGJjOK8dnFjcVS56fCuSZANzW9LyY8X-SjJz9MOy2m4nhp5eDkw7LvydIBEktOLdD1gzEYM8z0DN~UcyfysjJiiFuL-gjbrYKVPYANlPv8XEAQY56S2e5dk8e5QKGT1gmq7hLquHGw~w40hw1~UrRIUpfHpjZAgUeLtyZ18O9EC-ojYsDOZSmpA6-1yrUhD30e~kZVku2yopIOllPHuK-z~MU5BX4mGqR4Q5ro5IQ8GQvZuCJJ7v~s8YE3Z61Yy~Dm6cC88lIbsYw__",
    "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/5525675DDD0ADAC6D5527A7E051241B2DB49578C204C32C9C097B67022EABFC8/scale?width=1200&aspectRatio=1.78&format=webp",
    "https://s3-alpha-sig.figma.com/img/b7d9/1709/e4cec24ebf8935c61f14771c91776af1?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZBJtcmrgtQrV7XY1QMxDVb0ue8IQZRArmo3~x09nL2gjgflPnbASit4Mc--wl1Jxbpe7PYFWZvzumU8BMGhNllMZNWbKRnaMYG30XpAgsHKVfCJ3QmI9bZFDFX63U6sYbpU9VDJl4lBM31j3bwp-N2~06ZhtZsCB4oZLrk~grI3NR0MOhEfwlxIUavYj-Vj-OhSEDMacXKBQ3rTIqSwrULXMZ1Rk4c0MIyLi37Yi-GCowLbRM1biVWht7IHdRTfcJsFJDdZZF33ZjydJAk-FQI9jJF~kpJfx8hYbKH-5yDbmXLpu3QeWBp9qUU8H1v1Bp9XbBmfT-JdHm6zGM1oduQ__",
    "https://s3-alpha-sig.figma.com/img/aac6/c3fe/f68772bd5687939f1234345af9f32064?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kV6jfvTrRBJ~133XI3UyKLo~G-mBgZBKh9mo0fBPcpnxqx5hbUxIMdUyusScVLZVWwRpLdJFzE63XNxL9F126nRTHktcVUcm5URILkfs3feqTBGBV-iwi4P33EK8iokJF9fIJCMjovNrFdWGvRQwVTiFz2C6qvHsUzMWLqQ2FLAPFCB-xG-URwHdp4UxOjTj5xn3BZ6cRqym48tc6Nchh1BD2RzrdlqhSc5mOHJBVah-dZBvTxJ~qiHYGuIYuv-Dx~XgLB3mGOlY3L80OttDX7jsR-zsfl76XEUuU7HCsU4WciCyfUwD9V8a3pm3oYok-SJuNb3DtG0yOFC33ozCzQ__",
    "https://s3-alpha-sig.figma.com/img/b2f9/be30/f2d248e4d85a22299f4c0eab87c159e5?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VJ14L~qn1nXmCo27wHsUSW9Rv6hXF8e-iy-TEBdsIx6cPJXHu7-VgjbSX~OOQnGz0SicOWk9HG9Rh7XuBPa04UYXd~LQvt1SguJ-~RM3WsaOrQI7XmTbF-9zrji3d-1-TSyEFq0XQfasADn-XiL~iGD~PKBROBoOIc5jKAA7JO~a6LHQqYC0Atk0tpEtzOLOpAPCQ7nw-dzz3UgWpT0iE-9~m6tpNggM~5SzkvsFhvjfE2ndzzdhch3lJjAh~li5IevfrvP0186xtlWU4UzM45baT7u~WhABJS7dugOa1uwQodWt6Ayo1DJ84j4kM3JqniXCh-KGqyTvALIPJ60BsQ__",
    "https://s3-alpha-sig.figma.com/img/95fa/4f70/66220a81b1ae8140c787bed9ac9c76ae?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hSRhGPiGD0jTH~h11QtiBUWPLgzCalyS0~FuRsCNKfvc5Y0HbkRQeLoByDA9bmExo32mzMp49lo1Xn5EkmO1XiAQOCNWdyAVwaLnMJFPl~psGLVHGtM3KCrfekrJ5a-il7L3bSxmIQdHnMXseqtG-d~UgvdUGEbZobZUguCl8VNttMqzn5oKOxJYkCcaVbz16NpKQWwE0UzaUpjgdRE1HYosbVKgzkcwlaVqCQb-3xy2u8zswYvknNcnBd47-iPm2LI0lHPYeBZLvOygQrLXzjih7qJoBoUJ1OrYmgEljey9ycimPFi3dXeJEQaMZDCsT6w9IN0aI3-YVzZ5x1xajQ__",
    "https://s3-alpha-sig.figma.com/img/eeb5/4bfe/b7f715a11c3f77fa7d5f1a847fc8360e?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=D7ZvfLiVuWncFuKFFhQ9kLnRn24lWfSpgCswE3NZVp0yizIN-Ba0ZfS8rr1nnIN4RJ5ept58WD8R1DGXQ73~pv~wGTxx1QdAa5MBXv3ixPAZuZS7T4rRin1Nzjem1aNzyoyH96NaTGZzVvaEeTEnN0MzIz7vnpg52alDr1p8AK2~WAozFtazyocGJ0CTT-0kHNKSPAUXBAYZzq888fLdFM9HMV76l2hgN1GF08DjEEZCqIlu3pgRK9e~XWly2OiR1hNbjCnUXaU~KfxZKNpLqKMHhqUQJfNKAoLJVZ7NBXhP00Za8Szr~onCOgMHku0MyRp~Qa~RiMl5HvmLVki4zw__",
  ];

  const [selectedMovieIndex, setSelectedMovieIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    preloadImages(backgroundImages);
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

  // Determine the number of images to show based on screen width
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
        className="absolute h-[100vh] w-[100vw] bg-cover brightness-50 bg-center"
        style={{
          backgroundImage: `url('${backgroundImages[selectedMovieIndex]}')`,
        }}
      ></div>
      <div className="h-[100vh] w-[100vw] flex flex-col justify-between relative">
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
