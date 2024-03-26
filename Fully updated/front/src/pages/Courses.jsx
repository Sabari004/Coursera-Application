import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Courses = () => {
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const [user, setUser] = useState({});
  const [enrolled, setEnrolled] = useState([]);
  const token1 = JSON.parse(localStorage.getItem("user")).token;
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token1}`;
    axios.get(`http://localhost:8989/getCourseById/${id}`).then((r) => {
      setCourse(r.data);

      axios
        .get(`http://localhost:8989/getEnrollIdAndEmail/${id}`)
        .then((r1) => {
          console.log(r1.data);
          setEnrolled(r1.data);
        });
    });
  }, []);
  const CustomButton = ({ en }) => {};
  return (
    <>
      <div className="relative sm:-8 p-4 bg-[#2D033B]  min-h-screen flex flex-row">
        <ToastContainer />
        <div className="sm:flex hidden mr-10 relative">
          <Sidebar />
        </div>
        <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
          <Navbar />
          <div className="mt-[70px] ml-5 w-[80vw]">
            <div
              className="flex flex-col md:flex-row gap-4 md:gap-8"
              data-id="23"
            >
              {/* Course Details */}
              <div className="md:w-1/4" data-id="24">
                <div
                  className="rounded-lg border bg-card text-card-foreground shadow-sm bg-white"
                  data-id="25"
                  data-v0-t="card"
                >
                  <div className="flex flex-col space-y-1.5 p-6" data-id="26">
                    <h3
                      className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight"
                      data-id="27"
                    >
                      Course Details
                    </h3>
                  </div>
                  <div className="p-6" data-id="28">
                    <div className="grid gap-2" data-id="29">
                      <div className="mb-5" data-id="30">
                        <img src={course.img_url}></img>
                      </div>
                      <div className="grid gap-1" data-id="30">
                        <label
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          data-id="31"
                        >
                          Title
                        </label>
                        <p data-id="32">{course.course_name}</p>
                      </div>
                      <div className="grid gap-1" data-id="33">
                        <label
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          data-id="34"
                        >
                          Description
                        </label>
                        <p data-id="35">{course.description}</p>
                      </div>
                      <div className="grid gap-1" data-id="33">
                        <label
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          data-id="34"
                        >
                          Course Fees
                        </label>
                        <p data-id="35">{course.fees}</p>
                      </div>
                      <div className="grid gap-1" data-id="36">
                        <label
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          data-id="37"
                        >
                          Instructor
                        </label>
                        <p data-id="38">{course.instructor}</p>
                      </div>
                      <div className="grid gap-1" data-id="36">
                        <label
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          data-id="37"
                        >
                          Duration
                        </label>
                        <p data-id="38">{course.duration}</p>
                      </div>
                      <div className="grid gap-1" data-id="36">
                        {enrolled === null && (
                          <button
                            className="w-full bg-blue-600 p-3 rounded-md text-white font-bold "
                            onClick={(e) => {
                              console.log(id);
                              const id1 = JSON.parse(
                                localStorage.getItem("user")
                              ).id;
                              axios
                                .post(`http://localhost:8989/addEnroll/${id}`, {
                                  status: "Ongoing",
                                  date: "28-01-2024",
                                })
                                .then((r) =>
                                  toast.success("Successfully Enrolled")
                                );
                              // console.log(JSON.parse(localStorage.getItem("user")).email);
                            }}
                          >
                            Enroll
                          </button>
                        )}
                        {enrolled !== null &&
                          enrolled?.status === "Ongoing" && (
                            <button
                              className="w-full bg-orange-400 p-3 rounded-md text-white font-bold "
                              onClick={(e) => {
                                // console.log(id);
                                const enroll = enrolled;
                                enroll.status = "Completed";
                                axios
                                  .post(
                                    `http://localhost:8989/putEnroll/${enroll.enrolled_id}/Completed`
                                  )
                                  .then((r) =>
                                    toast.success("Successfully Completed")
                                  );
                              }}
                            >
                              Ongoing
                            </button>
                          )}
                        {enrolled !== null &&
                          enrolled?.status === "Completed" && (
                            <button className="w-full bg-green-500 p-3 rounded-md text-white font-bold ">
                              Completed
                            </button>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enrolled Users */}
              <div className="w-[70vw]" data-id="39">
                <iframe
                  className="w-[50vw] h-[60vh]"
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/ZxKM3DCV2kE?si=y5VULdzFlT7CfQsY"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Courses;
