import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { HiOutlineBars3 } from "react-icons/hi2";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { toast, ToastContainer } from "react-toastify";
import { RxCross2 } from "react-icons/rx";

export default function AdminUsers() {
  const [visible, setVisible] = useState(false);
  const [update, setUpdate] = useState(0);
  const [users, setUsers] = useState([]);
  const [updatedValues, setUpdatedValues] = useState({
    name: "",
    email: "",
    contact: "",
  });
  useEffect(() => {
    const getUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      setUsers(querySnapshot.docs);
    };
    getUsers();
  }, [update]);

  useEffect(() => {
    if (users.length > 0) {
      setUpdatedValues({
        name: users[update].data().username,
        email: users[update].data().email,
        contact: users[update].data().phoneNo,
      });
    }
  }, [update]);

  const handleDelete = async (email) => {
    await deleteDoc(doc(db, "users", email));
    setUsers(users.filter((e) => e.data().email !== email));
    toast.success("Successfully deleted user");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookingRef = doc(db, "users", updatedValues.email);

    try {
      const bookingSnap = await getDoc(bookingRef);

      if (bookingSnap.exists()) {
        await updateDoc(bookingRef, {
          username: updatedValues.name,
          email: updatedValues.email,
          phoneNo: updatedValues.contact,
        });
        toast.success("Successfully Updated");
        setUpdate(0);
      } else {
        toast.error("User does not exist.");
      }
    } catch (error) {
      console.error("Error updating document:", error);
      toast.error("Failed to update user. Please try again.");
    }
  };

  return (
    <div className="bg-[#161a2b] flex w-full min-h-[100vh]">
      <ToastContainer />
      {update !== 0 && (
        <div className="absolute w-[100vw] h-[100vh] flex justify-center items-center">
          <form
            className="bg-white w-[95%] md:w-[400px] rounded-md p-4 text-center relative z-40"
            onSubmit={handleSubmit}
          >
            <RxCross2
              className="absolute top-5 left-[93%] w-5 h-5 text-[#787878] cursor-pointer"
              onClick={() => {
                setUpdate(0);
              }}
            />
            <h1 className="text-black font-semibold text-xl mt-4">UPDATE</h1>
            <label className="form-control w-full max-w-md mt-4">
              <div className="label">
                <span className="label-text text-black text-md font-semibold">
                  Name
                </span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full border-[#CFCFCF] bg-transparent h-10 rounded-md focus:border-[#CFCFCF] text-black"
                value={updatedValues.name}
                name="name"
                onChange={(e) => {
                  setUpdatedValues({ ...updatedValues, name: e.target.value });
                }}
              />
            </label>
            <label className="form-control w-full max-w-md mt-4">
              <div className="label">
                <span className="label-text text-black text-md font-semibold">
                  Email
                </span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full border-[#CFCFCF] bg-transparent h-10 rounded-md focus:border-[#CFCFCF] text-black"
                value={updatedValues.email}
                name="email"
                onChange={(e) => {
                  setUpdatedValues({ ...updatedValues, email: e.target.value });
                }}
              />
            </label>
            <label className="form-control w-full max-w-md mt-4">
              <div className="label">
                <span className="label-text text-black text-md font-semibold">
                  Contact
                </span>
              </div>
              <input
                type="text"
                className={`input input-bordered w-full border-[#CFCFCF] bg-transparent h-10 rounded-md focus:border-[#CFCFCF] text-black ${updatedValues}`}
                value={updatedValues.contact}
                name="contact"
                onChange={(e) => {
                  setUpdatedValues({
                    ...updatedValues,
                    contact: e.target.value,
                  });
                }}
              />
            </label>
            <button
              className="text-white text-center text-sm bg-[#2c5cff] p-2 py-3 mt-6 w-full rounded-md"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      )}
      <AdminSidebar
        className="md:w-[20%]"
        selected="Users"
        visible={visible}
        setVisible={setVisible}
      />
      <div className="p-4 sm:p-8 lg:p-10 !pt-0 md:w-[80%] md:ml-[20%]">
        <div className="flex gap-3 items-center mt-8">
          <HiOutlineBars3
            className="w-6 h-6 md:hidden cursor-pointer"
            onClick={() => setVisible(!visible)}
          />
          <h2 className="text-2xl font-bold">Users</h2>
        </div>

        <div className="overflow-x-auto mt-8">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((e, ind) => (
                <>
                  {e.data().username !== "admin" && (
                    <tr>
                      <td>
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="font-bold">{e.data().username}</div>
                            <div className="text-sm opacity-50">India</div>
                          </div>
                        </div>
                      </td>
                      <td>{e.data().email}</td>
                      <td>
                        {e.data().phoneNo === null
                          ? "Not updated"
                          : e.data().phoneNo}
                      </td>
                      <th className="w-8">
                        <button
                          className="btn btn-ghost btn-xs bg-red-500 rounded-md text-md"
                          onClick={() => {
                            handleDelete(e.data().email);
                          }}
                        >
                          Delete
                        </button>
                      </th>
                      <th className="w-8">
                        <button
                          className="btn btn-ghost btn-xs bg-green-700 rounded-md text-md"
                          onClick={() => {
                            setUpdate(ind);
                          }}
                        >
                          Update
                        </button>
                      </th>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
