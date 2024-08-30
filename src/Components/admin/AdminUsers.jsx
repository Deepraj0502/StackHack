import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { HiOutlineBars3 } from "react-icons/hi2";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export default function AdminUsers() {
  const [visible, setVisible] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      setUsers(querySnapshot.docs);
    };
    getUsers();
  }, []);

  const handleDelete = async (email) => {
    await deleteDoc(doc(db, "users", email));
  };
  return (
    <div className="bg-[#161a2b] flex w-full min-h-[100vh]">
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
              {users.map((e) => (
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
                      <td>{e.data().phoneNo}</td>
                      <th>
                        <button
                          className="btn btn-ghost btn-xs bg-red-500 rounded-md text-md"
                          onClick={() => {
                            handleDelete(e.data().email);
                          }}
                        >
                          Delete
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
