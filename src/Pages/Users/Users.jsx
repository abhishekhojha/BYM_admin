import React, { useState } from "react";
import InnerLoader from "../../Components/InnerLoader";
import ApiServices from "../../Axios";

import { Link } from "react-router-dom";
// import m from "@editorjs/embed";

function Users() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [model, setModel] = useState(false);
  const [modelData, setModelData] = useState([]);
  const [roleLoad, setRoleLoad] = useState(false);
  const handleRemove = async (id) => {};
  const getUsers = async (e, params = "") => {
    if (e && e != "current") {
      if (e.target.getAttribute("aria-label"))
        params = e.target.getAttribute("aria-label");
    }
    setLoading(true);

    try {
      // const { data } = await ApiServices.Axios.get("/users");
      if (params == "") {
        const data = await ApiServices.makeRequest("/users", "GET");
        setUserData(data);
        setLoading(false);
      }
      if (params == "prev") {
        if (userData.page <= 1) {
          setLoading(false);
          return;
        }
        const data = await ApiServices.makeRequest(
          `/users?page=${userData.page - 1}`,
          "GET"
        );
        setUserData(data);
        setLoading(false);
        return;
      }
      if (params == "next") {
        if (userData.page >= userData.totalPages) return;
        const data = await ApiServices.makeRequest(
          `/users?page=${userData.page + 1}`,
          "GET"
        );
        setUserData(data);
        setLoading(false);
        return;
      }
      if (e == "current") {
        const data = await ApiServices.makeRequest(
          `/users?page=${userData.page}`,
          "GET"
        );
        setUserData(data);
        setLoading(false);
        return;
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };
  useState(() => {
    getUsers();
  }, []);
  function DateCoverter(date) {
    const d = new Date(date);
    return d.toDateString();
  }
  function RoleChangeModel(e) {
    userData.users.find((user) => {
      if (user._id === e.target.id) {
        setModelData(user);
        return;
      }
    });
    setModel(true);
  }
  const RoleChange = async () => {
    setRoleLoad(true);
    try {
      const data = await ApiServices.makeRequest(
        `/users/${modelData._id}`,
        "PUT",
        { role: modelData.role }
      );
      getUsers("current");
      setModel(false);
      setRoleLoad(false);
    } catch (error) {
      setModel(false);
      setRoleLoad(false);
      alert(error.message);
    }
  };
  if (loading) return <InnerLoader />;
  return (
    <main className="h-full pb-16 overflow-y-auto">
      <div
        className={
          model
            ? "model-wrapper w-full h-[100vh] bg-white absolute mx-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-lg shadow-lg h-1/2 transition-all transition-500 flex items-center justify-center"
            : "model-wrapper w-full h-full bg-white absolute mx-auto top-1/2 left-1/2 transition-all transition-500 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-lg shadow-lg h-1/2 opacity-0 invisible flex items-center justify-end"
        }
      >
        <div className="model bg-white w-full md:w-1/3 mx-auto transition-all transition-500 p-4 rounded-lg shadow-lg h-1/2">
          <div className="model-content">
            <div className="model-header flex justify-between items-center mb-4">
              <h2 className="text-lg">Change Role</h2>
              <button className="" onClick={() => setModel(false)}>
                <img src="./close-window.png" className="w-8" alt="" />
              </button>
            </div>
            <div className="model-body flex flex-col gap-4 justify-center p-4">
              <h2 className="text-lg">{modelData.name}</h2>
              <select
                className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray px-4 border border-[#e2e8f0] bg-white py-3"
                value={modelData.role}
                onChange={(e) =>
                  setModelData({ ...modelData, role: e.target.value })
                }
              >
                {/* <option value="admin">Admin</option> */}
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
              <button
                className="px-5 py-3 font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple capitalize"
                onClick={RoleChange}
              >
                {roleLoad ? "Please Wait.." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {loading ? (
        ""
      ) : (
        <div className="container grid px-2 md:px-6 mx-auto">
          <div className="flex justify-between items-center">
            <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
              Users
            </h2>
            {/* 
            <Link to="/createuser">
              <button className="bg-[#7e3af2] text-white px-4 py-2 rounded-md">
                + Create Users
              </button>
            </Link> */}
          </div>

          {/* Table */}
          <div className="w-full mb-8 overflow-hidden rounded-lg shadow-xs">
            <div className="w-full overflow-x-auto">
              <table className="w-full ">
                <thead>
                  <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Date Created</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                  {userData.users.map((user) => (
                    <tr
                      key={user._id}
                      className="text-gray-700 dark:text-gray-400"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center text-sm">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                              {user.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm max-w-xs break-words truncate">
                        {DateCoverter(user.createdAt)}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <button
                          className="px-5 py-3 font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple capitalize"
                          id={user._id}
                          onClick={RoleChangeModel}
                        >
                          {user.role}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-xs flex gap-2">
                        <Link to={"/edituser/" + user._id}>
                          <button>
                            <img src="edit.png" alt="edit" />
                          </button>
                        </Link>
                        <button onClick={() => handleRemove(user._id)}>
                          <img src="trash.png" alt="trash" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
              <span className="flex items-center col-span-3">
                Showing {userData.page} of {userData.totalPages} Pages
              </span>
              <span className="col-span-2"></span>
              <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                <nav aria-label="Table navigation">
                  <ul className="inline-flex items-center">
                    {/* Pagination buttons */}
                    <li>
                      <button
                        className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                        aria-label="prev"
                        onClick={getUsers}
                      >
                        <svg
                          className="w-4 h-4 fill-current"
                          aria-hidden="true"
                          viewBox="0 0 20 20"
                          aria-label="prev"
                        >
                          <path
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                            fillRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </li>
                    <li>
                      <button
                        className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                        aria-label="next"
                        onClick={getUsers}
                      >
                        <svg
                          className="w-4 h-4 fill-current"
                          aria-hidden="true"
                          viewBox="0 0 20 20"
                          aria-label="next"
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <path
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                            fillRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </li>
                    {/* ... Previous button, page numbers, and Next button would go here ... */}
                  </ul>
                </nav>
              </span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Users;
