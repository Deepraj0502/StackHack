import { data } from "autoprefixer";
import React, { useState } from "react";
import { GoArrowRight } from "react-icons/go";

export default function CurrentPlaying() {
  const [showAll, setShowAll] = useState(false);
  const [showAll2, setShowAll2] = useState(false);

  const cards = [
    {
      imageurl:
        "https://ik.imagekit.io/gn9by35ed/Movie/image%2014.png?updatedAt=1723991383624",
      name: "The Lion King",
      date: "20 April",
      age: "18+",
      lang: ["En", "Ru"],
    },
    {
      imageurl:
        "https://ik.imagekit.io/gn9by35ed/Movie/overlay.png?updatedAt=1724054889845",
      name: "Vikings",
      date: "20 April",
      age: "18+",
      lang: ["Tr", "En"],
    },
    {
      imageurl:
        "https://ik.imagekit.io/gn9by35ed/Movie/overlay%20(1).png?updatedAt=1724054900187",
      name: " Zəhər tuluğu",
      date: "20 April",
      age: "18+",
      lang: ["Ru", "Tr"],
    },
    {
      imageurl:
        "https://ik.imagekit.io/gn9by35ed/Movie/overlay%20(2).png?updatedAt=1724054968669",
      name: "Grey's anatomy",
      date: "20 April",
      age: "18+",
      lang: ["En"],
    },
    {
      imageurl:
        "https://ik.imagekit.io/gn9by35ed/Movie/image%2014.png?updatedAt=1723991383624",
      name: "The Lion King",
      date: "20 April",
      age: "18+",
      lang: ["En", "Ru"],
    },
    {
      imageurl:
        "https://ik.imagekit.io/gn9by35ed/Movie/image%2014.png?updatedAt=1723991383624",
      name: "The Lion King",
      date: "20 April",
      age: "18+",
      lang: ["En", "Ru"],
    },
    {
      imageurl:
        "https://ik.imagekit.io/gn9by35ed/Movie/image%2014.png?updatedAt=1723991383624",
      name: "The Lion King",
      date: "20 April",
      age: "18+",
      lang: ["En", "Ru"],
    },
    {
      imageurl:
        "https://ik.imagekit.io/gn9by35ed/Movie/image%2014.png?updatedAt=1723991383624",
      name: "The Lion King",
      date: "20 April",
      age: "18+",
      lang: ["En", "Ru"],
    },
    {
      imageurl:
        "https://ik.imagekit.io/gn9by35ed/Movie/image%2014.png?updatedAt=1723991383624",
      name: "The Lion King",
      date: "20 April",
      age: "18+",
      lang: ["En", "Ru"],
    },
    {
      imageurl:
        "https://ik.imagekit.io/gn9by35ed/Movie/image%2014.png?updatedAt=1723991383624",
      name: "The Lion King",
      date: "20 April",
      age: "18+",
      lang: ["En", "Ru"],
    },
  ];

  const displayedCards = showAll ? cards : cards.slice(0, 4);

  const toggleCards = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  const cards2 = [
    {
      imageurl1:
        "https://ik.imagekit.io/gn9by35ed/Movie/image%2014.png?updatedAt=1723991383624",
      name1: "The Lion King",
      date1: "20 April",
      age1: "18+",
      lang1: ["En", "Ru"],
    },
    {
      imageurl1:
        "https://ik.imagekit.io/gn9by35ed/Movie/overlay.png?updatedAt=1724054889845",
      name1: "Vikings",
      date1: "20 April",
      age1: "18+",
      lang1: ["Tr", "En"],
    },
    {
      imageurl1:
        "https://ik.imagekit.io/gn9by35ed/Movie/overlay%20(1).png?updatedAt=1724054900187",
      name1: " Zəhər tuluğu",
      date1: "20 April",
      age1: "18+",
      lang1: ["Ru", "Tr"],
    },
    {
      imageurl1:
        "https://ik.imagekit.io/gn9by35ed/Movie/overlay%20(2).png?updatedAt=1724054968669",
      name1: "Grey's anatomy",
      date1: "20 April",
      age1: "18+",
      lang1: ["En"],
    },
    {
      imageurl1:
        "https://ik.imagekit.io/gn9by35ed/Movie/image%2014.png?updatedAt=1723991383624",
      name1: "The Lion King",
      date1: "20 April",
      age1: "18+",
      lang1: ["En", "Ru"],
    },
    {
      imageurl1:
        "https://ik.imagekit.io/gn9by35ed/Movie/image%2014.png?updatedAt=1723991383624",
      name1: "The Lion King",
      date1: "20 April",
      age1: "18+",
      lang1: ["En", "Ru"],
    },
    {
      imageurl1:
        "https://ik.imagekit.io/gn9by35ed/Movie/image%2014.png?updatedAt=1723991383624",
      name1: "The Lion King",
      date1: "20 April",
      age1: "18+",
      lang1: ["En", "Ru"],
    },
    {
      imageurl1:
        "https://ik.imagekit.io/gn9by35ed/Movie/image%2014.png?updatedAt=1723991383624",
      name1: "The Lion King",
      date1: "20 April",
      age1: "18+",
      lang1: ["En", "Ru"],
    },
    {
      imageurl1:
        "https://ik.imagekit.io/gn9by35ed/Movie/image%2014.png?updatedAt=1723991383624",
      name1: "The Lion King",
      date1: "20 April",
      age1: "18+",
      lang1: ["En", "Ru"],
    },
    {
      imageurl1:
        "https://ik.imagekit.io/gn9by35ed/Movie/image%2014.png?updatedAt=1723991383624",
      name1: "The Lion King",
      date1: "20 April",
      age1: "18+",
      lang1: ["En", "Ru"],
    },
  ];

  const displayedCards2 = showAll2 ? cards2 : cards2.slice(0, 4);

  const toggleCards2 = () => {
    setShowAll2((prevShowAll2) => !prevShowAll2);
  };


  return (
    <>
      <div className="p-4 lg:p-20">
        <div className="flex flex-row ">
          <div className="w-[50%]">
            <h5 className="font-bold text-lg lg:text-xl">Current Playing</h5>
          </div>
          <div className="w-[50%] flex justify-end">
            <div className="flex cursor-pointer" onClick={toggleCards}>
              <h5 className=" font-bold text-lg lg:text-xl px-6">{!showAll ? "see more" : "see less"}</h5>
              <GoArrowRight className="h-4 lg:h-6 w-4 lg:w-6 mt-2 lg:mt-1" />
            </div>
          </div>
        </div>
        <div className="pt-6 lg:pt-10">
          <div className="grid  grid-cols-1 lg:grid-cols-4 justify-between gap-4 ">
            {displayedCards.map((data) => (
              <div className="bg-cover bg-center  h-[380px] lg:h-[450px] transition-all duration-500 flex flex-col justify-end items-center py-2 lg:py-4 cursor-pointer " style={{backgroundImage:"url('"+data.imageurl+"')"}}>
                <div className="transition-all scale-1 duration-200 flex flex-col  p-4 lg:p-0 w-full sm:w-60 ">
                  <h1 className="text-base text-xl lg:text-lg font-semibold text-white ">
                    {data.name}
                  </h1>
                  <h1 className="text-base text-lg  text-white ">
                    {data.date}
                  </h1>
                  <h1 className="text-base text-xl lg:text-lg  text-white font-semibold">
                    {data.age}
                  </h1>
                  <div className="flex flex-row gap-2 mt-2">
                    {data.lang.map((data2) => (
                      <div className="bg-gray-600 bg-opacity-50 h-6 w-10 text-center rounded-md">
                        <h1 className="text-white ">{data2}</h1>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            

            {/* <div className="bg-cover bg-center w-[25%]  h-[450px] transition-all duration-500 flex flex-col justify-end items-center py-4 cursor-pointer bg-[url('https://ik.imagekit.io/gn9by35ed/Movie/overlay.png?updatedAt=1724054889845')]">
              <div className="transition-all scale-1 duration-200 flex flex-col justify-center w-full sm:w-60 ">
                <h1 className="text-base sm:text-lg font-semibold text-white ">
                  Vikings
                </h1>
                <h1 className="text-base sm:text-lg  text-white ">20 April</h1>
                <h1 className="text-base sm:text-lg  text-white font-semibold">
                  18+
                </h1>
                <div className="flex flex-row gap-2 mt-2">
                  <div className="bg-gray-600 bg-opacity-50 h-6 w-10 text-center rounded-md">
                    <h1 className="text-white ">Tr</h1>
                  </div>
                  <div className="bg-gray-600 bg-opacity-50 h-6 w-10 text-center rounded-md">
                    <h1 className="text-white ">En</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-cover bg-center w-[25%] h-[450px] transition-all duration-500 flex flex-col justify-end items-center py-4 cursor-pointer bg-[url('https://ik.imagekit.io/gn9by35ed/Movie/overlay%20(1).png?updatedAt=1724054900187')]">
              <div className="transition-all scale-1 duration-200 flex flex-col justify-center w-full sm:w-60 ">
                <h1 className="text-base sm:text-lg font-semibold text-white ">
                  Zəhər tuluğu
                </h1>
                <h1 className="text-base sm:text-lg  text-white ">20 April</h1>
                <h1 className="text-base sm:text-lg  text-white font-semibold">
                  18+
                </h1>
                <div className="flex flex-row gap-2 mt-2">
                  <div className="bg-gray-600 bg-opacity-50 h-6 w-10 text-center rounded-md">
                    <h1 className="text-white ">Ru</h1>
                  </div>
                  <div className="bg-gray-600 bg-opacity-50 h-6 w-10 text-center rounded-md">
                    <h1 className="text-white ">Tr</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-cover bg-center w-[25%] h-[450px] transition-all duration-500 flex flex-col justify-end items-center py-4 cursor-pointer bg-[url('https://ik.imagekit.io/gn9by35ed/Movie/overlay%20(2).png?updatedAt=1724054968669')]">
              <div className="transition-all scale-1 duration-200 flex flex-col justify-center w-full sm:w-60 ">
                <h1 className="text-base sm:text-lg font-semibold text-white ">
                  Grey's anatomy
                </h1>
                <h1 className="text-base sm:text-lg  text-white ">20 April</h1>
                <h1 className="text-base sm:text-lg  text-white font-semibold">
                  18+
                </h1>
                <div className="flex flex-row gap-4 mt-2">
                  <div className="bg-gray-600 bg-opacity-50 h-6 w-10 text-center rounded-md">
                    <h1 className="text-white ">En</h1>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <div className="p-2 lg:p-20">
        <div className="flex flex-row ">
          <div className="w-[50%]">
            <h5 className="font-bold text-lg lg:text-xl">Current Playing</h5>
          </div>
          <div className="w-[50%] flex justify-end">
            <div className="flex cursor-pointer" onClick={toggleCards2}>
              <h5 className=" font-bold text-lg lg:text-xl px-6">{!showAll2 ? "see more" : "see less"}</h5>
              <GoArrowRight className="h-4 lg:h-6 w-4 lg:w-6 mt-2 lg:mt-1" />
            </div>
          </div>
        </div>
        <div className="pt-6 lg:pt-10 ">
        <div className="grid grid-cols-1 lg:grid-cols-4 justify-between gap-4 ">
            {displayedCards2.map((data3) => (
              <div className="bg-cover bg-center  h-[380px] lg:h-[450px] transition-all duration-500 flex flex-col justify-end items-center py-2 lg:py-4 cursor-pointer " style={{backgroundImage:"url('"+data3.imageurl1+"')"}}>
                <div className="transition-all scale-1 duration-200 flex flex-col p-4 lg:p-0 w-full sm:w-60  ">
                  <h1 className="text-base text-xl lg:text-lg font-semibold text-white ">
                    {data3.name1}
                  </h1>
                  <h1 className="text-base text-lg  text-white ">
                    {data3.date1}
                  </h1>
                  <h1 className="text-base text:xl lg:text-lg  text-white font-semibold">
                    {data3.age1}
                  </h1>
                  <div className="flex flex-row gap-2 mt-2">
                    {data3.lang1.map((data4) => (
                      <div className="bg-gray-600 bg-opacity-50 h-6 w-10 text-center rounded-md">
                        <h1 className="text-white ">{data4}</h1>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            

            {/* <div className="bg-cover bg-center w-[25%]  h-[450px] transition-all duration-500 flex flex-col justify-end items-center py-4 cursor-pointer bg-[url('https://ik.imagekit.io/gn9by35ed/Movie/overlay.png?updatedAt=1724054889845')]">
              <div className="transition-all scale-1 duration-200 flex flex-col justify-center w-full sm:w-60 ">
                <h1 className="text-base sm:text-lg font-semibold text-white ">
                  Vikings
                </h1>
                <h1 className="text-base sm:text-lg  text-white ">20 April</h1>
                <h1 className="text-base sm:text-lg  text-white font-semibold">
                  18+
                </h1>
                <div className="flex flex-row gap-2 mt-2">
                  <div className="bg-gray-600 bg-opacity-50 h-6 w-10 text-center rounded-md">
                    <h1 className="text-white ">Tr</h1>
                  </div>
                  <div className="bg-gray-600 bg-opacity-50 h-6 w-10 text-center rounded-md">
                    <h1 className="text-white ">En</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-cover bg-center w-[25%] h-[450px] transition-all duration-500 flex flex-col justify-end items-center py-4 cursor-pointer bg-[url('https://ik.imagekit.io/gn9by35ed/Movie/overlay%20(1).png?updatedAt=1724054900187')]">
              <div className="transition-all scale-1 duration-200 flex flex-col justify-center w-full sm:w-60 ">
                <h1 className="text-base sm:text-lg font-semibold text-white ">
                  Zəhər tuluğu
                </h1>
                <h1 className="text-base sm:text-lg  text-white ">20 April</h1>
                <h1 className="text-base sm:text-lg  text-white font-semibold">
                  18+
                </h1>
                <div className="flex flex-row gap-2 mt-2">
                  <div className="bg-gray-600 bg-opacity-50 h-6 w-10 text-center rounded-md">
                    <h1 className="text-white ">Ru</h1>
                  </div>
                  <div className="bg-gray-600 bg-opacity-50 h-6 w-10 text-center rounded-md">
                    <h1 className="text-white ">Tr</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-cover bg-center w-[25%] h-[450px] transition-all duration-500 flex flex-col justify-end items-center py-4 cursor-pointer bg-[url('https://ik.imagekit.io/gn9by35ed/Movie/overlay%20(2).png?updatedAt=1724054968669')]">
              <div className="transition-all scale-1 duration-200 flex flex-col justify-center w-full sm:w-60 ">
                <h1 className="text-base sm:text-lg font-semibold text-white ">
                  Grey's anatomy
                </h1>
                <h1 className="text-base sm:text-lg  text-white ">20 April</h1>
                <h1 className="text-base sm:text-lg  text-white font-semibold">
                  18+
                </h1>
                <div className="flex flex-row gap-4 mt-2">
                  <div className="bg-gray-600 bg-opacity-50 h-6 w-10 text-center rounded-md">
                    <h1 className="text-white ">En</h1>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
