import React, { useEffect, useState } from "react";
import AdminSideBar from "../components/AdminSideBar";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const token1 = JSON.parse(localStorage.getItem("user")).token;
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token1}`;
    axios.get(`http://localhost:8989/getCourseById/${id}`).then((r) => {
      setCourse(r.data);
    });
    axios.get(`http://localhost:8989/getEnrollByCourse/${id}`).then((r) => {
      setUser(r.data);
    });
  }, []);

  return (
    <>
      <div className="relative sm:-8 p-4 bg-[#2D033B]  min-h-screen flex flex-row">
        <div className="sm:flex hidden mr-10 relative">
          <AdminSideBar />
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
                          Enrolled Count
                        </label>
                        <p data-id="35">{user.length}</p>
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
                        <button
                          className="w-full bg-red-600 p-3 rounded-md text-white font-bold "
                          onClick={(e) => {
                            axios
                              .delete(
                                `http://localhost:8989/deleteCourse/${id}`
                              )
                              .then(() => navigate("/admin/courses"))
                              .catch(() => navigate("/admin/courses"));
                          }}
                        >
                          Delete Course
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enrolled Users */}
              <div className="md:w-3/4" data-id="39">
                <div
                  className=" bg-white rounded-lg border bg-card text-card-foreground shadow-sm"
                  data-id="40"
                  data-v0-t="card"
                >
                  <div className="flex flex-col space-y-1.5 p-6" data-id="41">
                    <h3
                      className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight"
                      data-id="42"
                    >
                      Enrolled Users
                    </h3>
                  </div>
                  <div className="p-6" data-id="43">
                    <div className="relative w-full overflow-auto">
                      <table
                        className="w-full caption-bottom text-sm"
                        data-id="44"
                      >
                        <thead className="[&amp;_tr]:border-b" data-id="45">
                          <tr
                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                            data-id="46"
                          >
                            <th
                              className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0"
                              data-id="47"
                            >
                              Name
                            </th>
                            <th
                              className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0"
                              data-id="48"
                            >
                              Email
                            </th>
                            <th
                              className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0"
                              data-id="49"
                            >
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody
                          className="[&amp;_tr:last-child]:border-0"
                          data-id="50"
                        >
                          {user.length > 0 &&
                            user.map((u) => (
                              <tr
                                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                data-id="51"
                              >
                                <td
                                  className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0"
                                  data-id="52"
                                >
                                  {u.userModel.user.name}
                                </td>
                                <td
                                  className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0"
                                  data-id="53"
                                >
                                  {u.userModel.email}
                                </td>
                                <td
                                  className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0"
                                  data-id="54"
                                >
                                  {u.status}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
