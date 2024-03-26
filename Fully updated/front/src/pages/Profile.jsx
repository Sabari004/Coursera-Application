import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import axios from "axios";
const Profile = () => {
  const id = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState({});
  const [coll, setColl] = useState("");
  const [ph, setPh] = useState("");
  const [dob, setDob] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [pass, setPass] = useState("");
  const [id1, setId] = useState("");
  const token1 = JSON.parse(localStorage.getItem("user")).token;
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token1}`;
    axios.get("http://localhost:8989/getUserByEmail").then((r) => {
      const data = r.data;
      setPh(data.phone == null ? "" : data.phone);
      setColl(data.college == null ? "" : data.college);
      setDob(data.dob == null ? "" : data.dob);
      setName(data.user.name == null ? "" : data.user.name);
      setEmail(data.email);
      console.log(data);
    });
  }, []);

  return (
    <>
      <div className="relative sm:-8 p-4 bg-[#2D033B]  min-h-screen flex flex-row">
        <div className="sm:flex hidden mr-10 relative">
          <Sidebar />
        </div>
        <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
          <Navbar />
          <div className="flex justify-evenly">
            <div className="mt-[10px] ml-5 w-[50vw] ">
              <section class="text-gray-600 rounded-xl bg-white  body-font relative">
                <div class="container px-3 py-10 mx-auto">
                  <div class="flex flex-col text-center w-full mb-5">
                    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                      Profile
                    </h1>
                  </div>
                  <div class="flex justify-center text-center w-full mb-5">
                    <div class="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        class="w-10 h-10"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                  </div>
                  <div class="lg:w-1/2 md:w-2/3 mx-auto">
                    <div class="flex flex-wrap -m-2">
                      <div class="p-2 w-1/2">
                        <div class="relative">
                          <label
                            for="name"
                            class="leading-7 text-sm text-gray-600"
                          >
                            User Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                        </div>
                      </div>
                      <div class="p-2 w-1/2">
                        <div class="relative">
                          <label
                            for="email"
                            class="leading-7 text-sm text-gray-600"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            value={email}
                          />
                        </div>
                      </div>
                      <div class="p-2 w-1/2">
                        <div class="relative">
                          <label
                            for="name"
                            class="leading-7 text-sm text-gray-600"
                          >
                            DOB
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                        </div>
                      </div>
                      <div class="p-2 w-1/2">
                        <div class="relative">
                          <label
                            for="email"
                            class="leading-7 text-sm text-gray-600"
                          >
                            Phone no
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={ph}
                            onChange={(e) => setPh(e.target.value)}
                            class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                        </div>
                      </div>
                      <div class="p-2 w-full">
                        <div class="relative">
                          <label
                            for="message"
                            class="leading-7 text-sm text-gray-600"
                          >
                            College
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={coll}
                            onChange={(e) => setColl(e.target.value)}
                            class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                          ></textarea>
                        </div>
                      </div>
                      <div class="p-2 w-full">
                        <button
                          class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                          onClick={(e) =>
                            axios
                              .post("http://localhost:8989/updateuser", {
                                phone: ph,
                                college: coll,
                                dob,
                              })
                              .then((r) => {
                                alert("User Updated");
                              })
                          }
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
