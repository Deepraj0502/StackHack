import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { HiOutlineBars3 } from "react-icons/hi2";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { toast, ToastContainer } from "react-toastify";
import { IoAddSharp } from "react-icons/io5";
import AddMovieForm from "./AddMovieForm";

export default function AdminMovies() {
  const [visible, setVisible] = useState(false);
  const [addForm, setAddForm] = useState(false);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const getMovies = async () => {
      const querySnapshot = await getDocs(collection(db, "movies"));
      setMovies(querySnapshot.docs);
      console.log(querySnapshot.docs[1].data());
    };
    getMovies();
  }, [addForm]);

  const handleDelete = async (name) => {
    await deleteDoc(doc(db, "movies", name));
    setMovies(movies.filter((e) => e.data().name !== name));
    toast.success("Successfully deleted user");
  };

  return (
    <div className="bg-[#161a2b] flex w-full min-h-[100vh]">
      <ToastContainer />
      <AdminSidebar
        className="md:w-[20%]"
        selected="Movies"
        visible={visible}
        setVisible={setVisible}
      />
      <div className="p-4 sm:p-8 lg:p-10 !pt-0 md:w-[80%] md:ml-[20%]">
        <div className="flex gap-3 justify-between items-center mt-8">
          <HiOutlineBars3
            className="w-6 h-6 md:hidden cursor-pointer"
            onClick={() => setVisible(!visible)}
          />
          <h2 className="text-2xl font-bold">Movies</h2>
          <button
            className="text-white text-sm bg-[#2c5cff] p-2 px-4 rounded-md flex gap-1 items-center"
            onClick={() => setAddForm(!addForm)}
          >
            <IoAddSharp className="w-4 h-4" />
            Add Movies
          </button>
        </div>
        <div className="overflow-x-auto mt-8">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>

                <th>Dates</th>
                <th>Languages</th>
                <th>Trailer</th>
                <th>Poster</th>
                <th>Background</th>
                <th>Age</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {movies.map((e) => (
                <tr>
                  <td>{e.data().name}</td>
                  <td className="description-cell">{e.data().description}</td>

                  <td>
                    {e.data().startDate} - {e.data().endDate}
                  </td>
                  <td>{e.data().languages.join(",")}</td>
                  <td>{e.data().trailer}</td>
                  <td>{e.data().poster}</td>
                  <td>{e.data().background}</td>
                  <td>{e.data().ageLimit}</td>
                  <th>
                    <button
                      className="btn btn-ghost btn-xs bg-red-500 rounded-md text-md"
                      onClick={() => {
                        handleDelete(e.data().name);
                      }}
                    >
                      Delete
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {addForm && <AddMovieForm setAddForm={setAddForm} />}
    </div>
  );
}
