import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddEnquiry = () => {
  const [course, setCourse] = useState([]);
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");
  const [id, setId] = useState(1);
  const token = JSON.parse(localStorage.getItem("user")).token;
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.get("http://localhost:8989/getCourse").then((r) => {
      setCourse(r.data);
      console.log(r.data);
      setId(r.data[0].course_id);
    });
    axios
      .get(
        `http://localhost:8989/api/v1/auth/getuser/${
          JSON.parse(localStorage.getItem("user")).email
        }`
      )
      .then((r) => {
        setUser(r.data);
        console.log(r.data);
      });
  }, []);

  // const { name, course, message } = inputdata;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8989/postEnquiry/${id}`, {
        description: message,
      })
      .then((r) => toast.success("Enquiry Raised"));
  };

  return (
    <>
      <div className="relative sm:-8 p-4 bg-[#2D033B]  min-h-screen flex flex-row">
        <ToastContainer />
        <div className="sm:flex hidden mr-10 relative">
          <Sidebar />
        </div>
        <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
          <Navbar />
          <div className="  w-[80vw]">
            <div className="flex justify-center">
              <section class="bg-white rounded-lg">
                <div class="py-8 lg:py-16 px-4 mx-auto">
                  <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 ">
                    Enquiry
                  </h2>
                  <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 sm:text-xl">
                    Got a technical issue? Want to send feedback about a beta
                    feature? Need details about our Business plan? Let us know.
                  </p>
                  <form action="#" class="space-y-4">
                    <div>
                      <label
                        for="subject"
                        class="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Course
                      </label>
                      <select
                        type="text"
                        id="subject"
                        name="course"
                        class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Let us know how we can help you"
                        required
                        value={id}
                        onChange={(e) => {
                          setId(e.target.value);
                        }}
                      >
                        {course.length > 0 &&
                          course?.map((u) => (
                            <option value={u.course_id}>{u.course_name}</option>
                          ))}
                      </select>
                    </div>
                    <div class="sm:col-span-2">
                      <label
                        for="message"
                        class="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Enquiry
                      </label>
                      <textarea
                        id="message"
                        rows="6"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Leave a comment..."
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      onClick={(e) => handleSubmit(e)}
                      class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 "
                    >
                      Send enquiry
                    </button>
                  </form>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEnquiry;
