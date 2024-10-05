import { data } from "autoprefixer";
import React, { useEffect, useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { db } from "firebase/firestore";
import { getDocs, collection } from "firebase/firestore";

async function fetchDataFromFirestore() {
  const querySnapshot = await getDocs(collection(db, "movies"));

  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({ name: doc.name, ...doc.data() });
  });
  return data;
}

export default function CurrentPlaying() {
 const [moviesData, setMoviesData ] = useState([]);
  
 useEffect(() => {
  async function fetchData() {
    const data = await fetchDataFromFirestore();
    setmoviesData(data);
  }
  fetchData();
 }, []); 
 
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
        "https://ik.imagekit.io/gn9by35ed/Movie/overlay%20(7).png?updatedAt=1725030523249",
      name: "Bergen",
      date: "20 April",
      age: "18+",
      lang: ["Tr", "Az"],
    },
    {
      imageurl:
        "https://ik.imagekit.io/gn9by35ed/Movie/overlay%20(8).png?updatedAt=1725030523216",
      name: "The Courier",
      date: "20 April",
      age: "18+",
      lang: ["Ru", "En"],
    },
    {
      imageurl:
        "https://ik.imagekit.io/gn9by35ed/Movie/overlay%20(9).png?updatedAt=1725030523135",
      name: "The marksman",
      date: "20 April",
      age: "18+",
      lang: ["Tr", "En"],
    },
    {
      imageurl:
        "https://ik.imagekit.io/gn9by35ed/Movie/overlay%20(10).png?updatedAt=1725030523220",
      name: "Wanda Vision",
      date: "20 April",
      age: "16+",
      lang: ["Ru"],
    },
    {
      imageurl:
        "https://ik.imagekit.io/gn9by35ed/Movie/image%2014%20(1).png?updatedAt=1725030522718",
      name: "Zack Synder's Justice",
      date: "25 April",
      age: "18+",
      lang: ["Ru", "En"],
    },
    {
      imageurl:
        "https://ik.imagekit.io/gn9by35ed/Movie/image%2014%20(2).png?updatedAt=1725030473886",
      name: "Attack on titan",
      date: "26 April",
      age: "16+",
      lang: ["Tr", "Az"],
    },
  ];

  const displayedCards = showAll ? cards : cards.slice(0, 4);

  const toggleCards = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  const cards2 = [
    {
      imageurl1:
        "https://ik.imagekit.io/gn9by35ed/Movie/overlay%20(3).png?updatedAt=1724054968435",
      name1: "Mortal kombat",
      date1: "20 April",
      age1: "18+",
      lang1: ["Ru", "En"],
    },
    {
      imageurl1:
        "https://ik.imagekit.io/gn9by35ed/Movie/overlay%20(4).png?updatedAt=1724054968608",
      name1: "Bliss",
      date1: "20 April",
      age1: "16+",
      lang1: ["Ru"],
    },
    {
      imageurl1:
        "https://ik.imagekit.io/gn9by35ed/Movie/overlay%20(5).png?updatedAt=1724054968546",
      name1: " After the rain",
      date1: "20 April",
      age1: "18+",
      lang1: ["Ru", "En"],
    },
    {
      imageurl1:
        "https://ik.imagekit.io/gn9by35ed/Movie/overlay%20(2).png?updatedAt=1724054968669",
      name1: "Up from slavery",
      date1: "20 April",
      age1: "18+",
      lang1: ["Ru", "En"],
    },
    {
      imageurl1:
        "https://ik.imagekit.io/gn9by35ed/Movie/Group%20135%20(5).png?updatedAt=1725032725221",
      name1: "Game of Thrones",
      date1: "20 April",
      age1: "18+",
      lang1: ["En", "Ru"],
    },
    {
      imageurl1:
        "https://ik.imagekit.io/gn9by35ed/Movie/Group%20135%20(1).png?updatedAt=1725031277503",
      name1: "Peter Rabbit 2",
      date1: "20 April",
      age1: "12+",
      lang1: ["Ru"],
    },
    {
      imageurl1:
        "https://ik.imagekit.io/gn9by35ed/Movie/overlay%20(11).png?updatedAt=1725031277492",
      name1: "Fear the walking dead",
      date1: "20 April",
      age1: "11+",
      lang1: ["En", "Ru"],
    },
    {
      imageurl1:
        "https://ik.imagekit.io/gn9by35ed/Movie/Group%20135%20(2).png?updatedAt=1725031277538",
      name1: "Howl's moving castle",
      date1: "23 April",
      age1: "12+",
      lang1: ["Ru", "En"],
    },
    {
      imageurl1:
        "https://ik.imagekit.io/gn9by35ed/Movie/Group%20135%20(4).png?updatedAt=1725031277512",
      name1: "Tom & Jerry",
      date1: "24 April",
      age1: "6+",
      lang1: ["En", "Ru"],
    },
    {
      imageurl1:
        "https://ik.imagekit.io/gn9by35ed/Movie/image%2014%20(3).png?updatedAt=1725031277535",
      name1: "Attack of Titan",
      date1: "25 April",
      age1: "16+",
      lang1: ["En", "Ru"],
    },
    {
      imageurl1:
        "https://ik.imagekit.io/gn9by35ed/Movie/image%2014%20(4).png?updatedAt=1725031277461",
      name1: "News of the world",
      date1: "25 April",
      age1: "16+",
      lang1: ["En", "Tr"],
    },
    {
      imageurl1:
        "https://ik.imagekit.io/gn9by35ed/Movie/image%2014.png?updatedAt=1723991383624",
      name1: "Olgan evi:2",
      date1: "23 April",
      age1: "16+",
      lang1: ["Tr", "Az"],
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
              <h5 className=" font-bold text-lg lg:text-xl px-6">
                {!showAll ? "see more" : "see less"}
              </h5>
              <GoArrowRight className="h-4 lg:h-6 w-4 lg:w-6 mt-2 lg:mt-1" />
            </div>
          </div>
        </div>
        <div className="pt-6 lg:pt-10">
          <div className="grid  grid-cols-1 lg:grid-cols-4 justify-between gap-4 ">
            {displayedCards.map((data) => (
              <div
                className="bg-cover bg-center  h-[380px] lg:h-[450px] transition-all duration-500 flex flex-col justify-end items-center py-2 lg:py-4 cursor-pointer "
                style={{ backgroundImage: "url('" + data.imageurl + "')" }}
              >
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
          </div>
        </div>
      </div>

      <div className="p-2 lg:p-20">
        <div className="flex flex-row ">
          <div className="w-[50%]">
            <h5 className="font-bold text-lg lg:text-xl">Coming soon</h5>
          </div>
          <div className="w-[50%] flex justify-end">
            <div className="flex cursor-pointer" onClick={toggleCards2}>
              <h5 className=" font-bold text-lg lg:text-xl px-6">
                {!showAll2 ? "see more" : "see less"}
              </h5>
              <GoArrowRight className="h-4 lg:h-6 w-4 lg:w-6 mt-2 lg:mt-1" />
            </div>
          </div>
        </div>
        <div className="pt-6 lg:pt-10 ">
          <div className="grid  grid-cols-1 lg:grid-cols-4  justify-between gap-4  ">
            {displayedCards2.map((data3) => (
              <div
                className="bg-cover bg-center h-[380px] lg:h-[450px] transition-all duration-500 flex flex-col justify-end items-center py-2 lg:py-4 cursor-pointer "
                style={{ backgroundImage: "url('" + data3.imageurl1 + "')" }}
              >
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
      <div className="p-2 lg:p-16 w-full">
        <ul className="timeline ">
          <li className="w-[20%]">
            <hr />
            <div className="timeline-start">1984</div>
            <div className="timeline-middle">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <hr />
          </li>
          <li className="w-[20%]">
            <hr />
            <div className="timeline-start">1998</div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <hr />
          </li>
          <li className="w-[20%]">
            <hr />
            <div className="timeline-start">2001</div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <hr />
          </li>
          <li className="w-[20%]">
            <hr />
            <div className="timeline-start">2007</div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <hr />
          </li>
          <li className="w-[20%]">
            <hr />
            <div className="timeline-start">2015</div>
            <div className="timeline-middle w-18">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <hr />
          </li>
        </ul>
      </div>
      <div className="flex flex-col lg:flex-row mt-6 lg:mt-8 p-4 lg:p-20">
        <div className="w-full lg:w-[50%] p-0 lg:p-8 ">
          <img
            src="https://ik.imagekit.io/gn9by35ed/Movie/image%2060.png?updatedAt=1724686346479"
            className="w-full object-cover"
          ></img>
        </div>
        <div className="w-full lg:w-[50%] pl-0 lg:px-20 py-0 lg:py-32">
          <p className="text-lg lg:text-xl italic ">OPERETTA</p>
          <p className="font-bold mt-4 lg:mt-8 text-lg lg:text-xl uppercase">
            Arshin Mal Alan
          </p>
          <p className="text-lg mt-0 lg:mt-2 text-justify">
            Arshin Mal Alan is a 4-act operetta composed by Azerbaijani composer
            Uzeyir Hajibeyov. The libretto of the work was also written by
            Uzeyir Hajibeyov in 1913 in St. Petersburg. The premiere of the
            opera was held on October 25, 1913 at the Haji Zeynelabidin Tagiyev
            Theater in Baku.
          </p>
        </div>
      </div>
      <div className="flex flex-col-reverse lg:flex-row mt-6 lg:mt-8 p-4 lg:p-20">
        <div className="w-full lg:w-[50%] pr-0 lg:pr-20 py-0 lg:py-20">
          <p className="text-lg lg:text-3xl font-bold ">About us</p>
          <p className="mt-4 lg:mt-8 italic text-sm lg:text-lg uppercase">
            2008-2018
          </p>
          <p className="text-lg mt-0 lg:mt-2 text-justify">
            According to the State Program for the Development of Azerbaijani
            Cinema for 2008-2018, Nizami, one of the oldest cinemas in the
            country, was inaugurated on December 27, 2011 after major
            reconstruction. In addition to the current repertoire of films,
            which includes the most interesting new films, presentations of
            national films...
          </p>
        </div>
        <div className="w-full lg:w-[50%] p-0 lg:p-8">
          <img
            src="https://ik.imagekit.io/gn9by35ed/Movie/Rectangle%204194.png?updatedAt=1724689773830"
            className="w-full object-cover"
          ></img>
        </div>
      </div>
      <p className="text-lg lg:text-3xl font-bold mt-6 lg:mt-8 px-6 lg:px-16">
        Latest News
      </p>
      <div className="flex flex-col lg:flex-row mt-2 lg:mt-4 p-4 lg:p-16">
        <div className="w-full lg:w-[50%] ">
          <div
            className="w-full bg-cover"
            style={{
              backgroundImage:
                "url('https://ik.imagekit.io/gn9by35ed/Movie/image%2056.png?updatedAt=1725006833676')",
            }}
          >
            <div className="pt-[40%] lg:pt-[45%] p-2 lg:p-10">
              <h1 className="font-bold text-xl lg:text-3xl ">
                New American films on the screen of Nizami Cinema Center
              </h1>
              <p className="pt-2 lg:pt-6">
                US-produced "Independence Day: Revival" at Nizami Cinema Center.
                "Neighbours. 2 in wartime ”films have been shown. "Independence
                Day: Revival" is based on a screenplay by Nicholas Wright and
                directed by Roland Emmerich in the genres of science fiction,
                adventure and war. Slogan: “We had 20 years to prepare.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between w-full lg:w-[50%] ">
          <div className=" flex flex-col lg:flex-row">
            <div className="w-full lg:w-[30%] pt-4 lg:pt-0 px-2 lg:px-10">
              <img
                className="w-full object-cover"
                src="https://ik.imagekit.io/gn9by35ed/Movie/image%2057.png?updatedAt=1725005162864"
              ></img>
            </div>
            <div className="w-full lg:w-[70%] p-2">
              <p>25.03.2022</p>
              <p>
                An event titled "April battles and victory" dedicated to the
                Armed Forces Day was held at the Nizami Cinema Center
              </p>
            </div>
          </div>
          <div className=" flex flex-col lg:flex-row">
            <div className="w-full lg:w-[30%]  pt-4 lg:pt-0 px-2 lg:px-10">
              <img
                className="w-full object-cover"
                src="https://ik.imagekit.io/gn9by35ed/Movie/image%2057%20(1).png?updatedAt=1725009764298"
              ></img>
            </div>
            <div className="w-[70%]">
              <p>27.04.2022</p>
              <p>"Khazri" dance group at Nizami Cinema Center</p>
            </div>
          </div>
          <div className=" flex flex-col lg:flex-row  ">
            <div className="w-full lg:w-[30%] pt-4 lg:pt-0 px-2 lg:px-10">
              <img
                className="w-full object-cover"
                src="https://ik.imagekit.io/gn9by35ed/Movie/image%2057%20(2).png?updatedAt=1725009747370"
              ></img>
            </div>
            <div className="w-full lg:w-[70%] p-2">
              <p>29.04.2022</p>
              <p>
                The conference "Azerbaijani cinema" was held at the Nizami
                Cinema Center.
              </p>
            </div>
          </div>
          <div className=" flex flex-col lg:flex-row">
            <div className="w-full lg:w-[30%]  pt-4 lg:pt-0 px-2 lg:px-10">
              <img
                className="w-full object-cover"
                src="https://ik.imagekit.io/gn9by35ed/Movie/image%2057%20(3).png?updatedAt=1725009737110"
              ></img>
            </div>
            <div className="w-full lg:w-[70%] p-2">
              <p>01.02.2022</p>
              <p>
                The conference "Heydar Aliyev and Azerbaijani cinema" was held
                at the Nizami Cinema Center
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
