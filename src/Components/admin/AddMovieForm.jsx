import { useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { RxCross2 } from "react-icons/rx";
import { toast, ToastContainer } from "react-toastify";

function AddMovieForm(props) {
  const [loading, setLoading] = useState(false);
  const [movieData, setMovieData] = useState({
    name: "",
    language: "",
    description: "",
    duration: "",
    startDate: "",
    endDate: "",
    poster: "",
    trailer: "",
    background: "",
    ageLimit: "",
  });

  const handleInputChange = (e) => {
    setMovieData({
      ...movieData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setMovieData({
      ...movieData,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      movieData.name === "" ||
      movieData.description === "" ||
      movieData.duration === "" ||
      movieData.ageLimit === "" ||
      movieData.background === "" ||
      movieData.endDate === "" ||
      movieData.startDate === "" ||
      movieData.language === "" ||
      movieData.poster === "" ||
      movieData.trailer === ""
    ) {
      toast.error("Enter all fields");
      return;
    }
    setLoading(true);
    try {
      let poster = "";
      let background = "";
      if (movieData.poster && movieData.background) {
        const storageRef = ref(storage, `movies/poster/${movieData.name}`);
        await uploadBytes(storageRef, movieData.poster);
        poster = await getDownloadURL(storageRef);
        const storageRef2 = ref(storage, `movies/background/${movieData.name}`);
        await uploadBytes(storageRef2, movieData.background);
        background = await getDownloadURL(storageRef2);
      }

      const movieRef = doc(db, "movies", `${movieData.name}`);
      const movieSnap = await getDoc(movieRef);

      if (!movieSnap.exists()) {
        await setDoc(movieRef, {
          name: movieData.name,
          languages: movieData.language.split(","),
          description: movieData.description,
          duration: movieData.duration,
          startDate: movieData.startDate,
          endDate: movieData.endDate,
          poster: poster,
          trailer: movieData.trailer,
          background: background,
          ageLimit: movieData.ageLimit,
        });
      }

      setMovieData({
        name: "",
        language: "",
        description: "",
        duration: "",
        startDate: "",
        endDate: "",
        poster: "",
        trailer: "",
        background: "",
        ageLimit: "",
      });
      setLoading(false);
      toast.success("Movie added successfully!");
    } catch (error) {
      console.error("Error adding movie: ", error);
      toast.error("Failed to add movie.");
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] fixed z-40 flex justify-center items-center">
      <ToastContainer />
      {loading && (
        <div className="absolute w-full h-[100vh] flex items-center justify-center z-40">
          <span className="loading loading-spinner loading-lg text-blue-500"></span>
        </div>
      )}
      <div className="bg-white p-4 flex flex-col items-center relative w-[95%] md:w-[500px] rounded-md max-h-[95vh] overflow-scroll">
        <RxCross2
          className="absolute top-5 left-[93%] w-5 h-5 text-[#787878] cursor-pointer"
          onClick={() => {
            props.setAddForm(false);
          }}
        />
        <h1 className="text-black font-semibold text-xl mt-4">ADD MOVIES</h1>
        <label className="form-control w-full max-w-md mt-4">
          <div className="label">
            <span className="label-text text-black text-md font-semibold">
              Name
              <span className="relative text-red-500 text-sm bottom-0 left-1">
                *
              </span>
            </span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full border-[#CFCFCF] bg-transparent h-10 rounded-md focus:border-[#CFCFCF] text-black"
            value={movieData.name}
            name="name"
            onChange={handleInputChange}
          />
        </label>
        <label className="form-control w-full max-w-md mt-4">
          <div className="label">
            <span className="label-text text-black text-md font-semibold">
              Description
              <span className="relative text-red-500 text-sm bottom-0 left-1">
                *
              </span>
            </span>
          </div>
          <textarea
            type="text"
            className="input input-bordered w-full border-[#CFCFCF] bg-transparent h-24 max-h-40 rounded-md focus:border-[#CFCFCF] text-black"
            value={movieData.description}
            name="description"
            onChange={handleInputChange}
          />
        </label>
        <label className="form-control w-full max-w-md mt-4">
          <div className="label">
            <span className="label-text text-black text-md font-semibold">
              Duration
              <span className="relative text-red-500 text-sm bottom-0 left-1">
                *
              </span>
            </span>
          </div>
          <input
            type="text"
            placeholder="1hr 30min"
            className="input input-bordered w-full border-[#CFCFCF] bg-transparent h-10 rounded-md focus:border-[#CFCFCF] text-black"
            value={movieData.duration}
            name="duration"
            onChange={handleInputChange}
          />
        </label>
        <label className="form-control w-full max-w-md mt-4">
          <div className="label">
            <span className="label-text text-black text-md font-semibold">
              Trailer
              <span className="relative text-red-500 text-sm bottom-0 left-1">
                *
              </span>
            </span>
          </div>
          <input
            type="text"
            placeholder="https://www.youtube.com/watch?v=sfM7_JLk-84"
            className="input input-bordered w-full border-[#CFCFCF] bg-transparent h-10 rounded-md focus:border-[#CFCFCF] text-black"
            value={movieData.trailer}
            name="trailer"
            onChange={handleInputChange}
          />
        </label>
        <label className="form-control w-full max-w-md mt-4">
          <div className="label">
            <span className="label-text text-black text-md font-semibold">
              Start Date
              <span className="relative text-red-500 text-sm bottom-0 left-1">
                *
              </span>
            </span>
          </div>
          <input
            type="date"
            className="input input-bordered w-full border-[#CFCFCF] bg-transparent h-10 rounded-md focus:border-[#CFCFCF] text-black"
            value={movieData.startDate}
            name="startDate"
            onChange={handleInputChange}
          />
        </label>
        <label className="form-control w-full max-w-md mt-4">
          <div className="label">
            <span className="label-text text-black text-md font-semibold">
              End Date
              <span className="relative text-red-500 text-sm bottom-0 left-1">
                *
              </span>
            </span>
          </div>
          <input
            type="date"
            className="input input-bordered w-full border-[#CFCFCF] bg-transparent h-10 rounded-md focus:border-[#CFCFCF] text-black"
            value={movieData.endDate}
            name="endDate"
            onChange={handleInputChange}
          />
        </label>
        <label className="form-control w-full max-w-md mt-4">
          <div className="label">
            <span className="label-text text-black text-md font-semibold">
              Language
              <span className="relative text-red-500 text-sm bottom-0 left-1">
                *
              </span>
            </span>
          </div>
          <input
            type="text"
            placeholder="EU,HI,RU"
            className="input input-bordered w-full border-[#CFCFCF] bg-transparent h-10 rounded-md focus:border-[#CFCFCF] text-black"
            value={movieData.language}
            name="language"
            onChange={handleInputChange}
          />
        </label>
        <label className="form-control w-full max-w-md mt-4">
          <div className="label">
            <span className="label-text text-black text-md font-semibold">
              Age Limit
              <span className="relative text-red-500 text-sm bottom-0 left-1">
                *
              </span>
            </span>
          </div>
          <input
            type="text"
            placeholder="16+"
            className="input input-bordered w-full border-[#CFCFCF] bg-transparent h-10 rounded-md focus:border-[#CFCFCF] text-black"
            value={movieData.ageLimit}
            name="ageLimit"
            onChange={handleInputChange}
          />
        </label>
        <label className="form-control w-full max-w-md mt-4">
          <div className="label">
            <span className="label-text text-black text-md font-semibold">
              Poster
              <span className="relative text-red-500 text-sm bottom-0 left-1">
                *
              </span>
            </span>
          </div>
          <input
            type="file"
            className="file-input w-full rounded-md bg-white text-black h-10 border-[#CFCFCF]"
            name="poster"
            onChange={handleFileChange}
          />
        </label>
        <label className="form-control w-full max-w-md mt-4">
          <div className="label">
            <span className="label-text text-black text-md font-semibold">
              Background
              <span className="relative text-red-500 text-sm bottom-0 left-1">
                *
              </span>
            </span>
          </div>
          <input
            type="file"
            className="file-input w-full rounded-md bg-white text-black h-10 border-[#CFCFCF]"
            name="background"
            onChange={handleFileChange}
          />
        </label>

        <button
          className="text-white text-center text-sm bg-[#2c5cff] p-2 py-3 mt-6 w-full rounded-md"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default AddMovieForm;
