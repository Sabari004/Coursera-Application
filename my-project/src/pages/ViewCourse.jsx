import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import { Link } from "react-router-dom";
import { logo, menu, search, thirdweb } from "../assets";
import { navlinks } from "../constants";
const Card = ({ det }) => {
  const navigate = useNavigate();

  const fetchData = (id) => {
    navigate("/user/viewcourses/" + id);
  };
  // console.log(det);

  return (
    <div className="mt-[70px] ml-5 ">
      <div class="h-[450px] relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
        <div class="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
          <img className="h-56" src={det.img_url} alt="card-image" />
        </div>
        <div class="p-6">
          <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {det.course_name}
          </h5>
          <p class="h-[100px] block font-sans text-base antialiased font-light leading-relaxed text-inherit">
            {det.description}
          </p>
        </div>
        <div class="p-6 pt-0">
          <button
            class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            type="button"
            onClick={(e) => fetchData(det.course_id)}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

const ViewCourse = () => {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);

  const [course, setCourse] = useState([]);
  const [ser, setSer] = useState("");
  const token1 = JSON.parse(localStorage.getItem("user")).token;
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token1}`;
    axios.get("http://localhost:8989/getAllCourses").then((r) => {
      setCourse(r.data);
    });
  }, []);

  return (
    <>
      <div className="relative sm:-8 p-4 bg-[#2D033B]  min-h-screen flex flex-row">
        <div className="sm:flex hidden mr-10 relative">
          <Sidebar />
        </div>
        <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
          <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
            <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
              <input
                type="text"
                placeholder="Search for courses"
                className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
                value={ser}
                onChange={(e) => setSer(e.target.value)}
              />

              <div className="w-[72px] h-full rounded-[20px] bg-[#810CA8] flex justify-center items-center cursor-pointer">
                <img
                  src={search}
                  alt="search"
                  className="w-[15px] h-[15px] object-contain"
                />
              </div>
            </div>

            <div className="sm:flex hidden flex-row justify-end gap-4">
              <CustomButton
                btnType="button"
                // title={address ? "Create a campaign" : "Connect"}
                // styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
                handleClick={() => {
                  // if (address) navigate("create-campaign");
                  // else connect();
                }}
              />

              <Link to="/profile">
                <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
                  <img
                    src={thirdweb}
                    alt="user"
                    className="w-[60%] h-[60%] object-contain"
                  />
                </div>
              </Link>
            </div>

            {/* Small screen navigation */}
            <div className="sm:hidden flex justify-between items-center relative">
              <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
                <img
                  src={logo}
                  alt="user"
                  className="w-[60%] h-[60%] object-contain"
                />
              </div>

              <img
                src={menu}
                alt="menu"
                className="w-[34px] h-[34px] object-contain cursor-pointer"
                onClick={() => setToggleDrawer((prev) => !prev)}
              />

              <div
                className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${
                  !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
                } transition-all duration-700`}
              >
                <ul className="mb-4">
                  {navlinks.map((link) => (
                    <li
                      key={link.name}
                      className={`flex p-4 ${
                        isActive === link.name && "bg-[#3a3a43]"
                      }`}
                      onClick={() => {
                        setIsActive(link.name);
                        setToggleDrawer(false);
                        navigate(link.link);
                      }}
                    >
                      <img
                        src={link.imgUrl}
                        alt={link.name}
                        className={`w-[24px] h-[24px] object-contain ${
                          isActive === link.name ? "grayscale-0" : "grayscale"
                        }`}
                      />
                      <p
                        className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                          isActive === link.name
                            ? "text-[#1dc071]"
                            : "text-[#808191]"
                        }`}
                      >
                        {link.name}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="flex mx-4">
                  <CustomButton
                    btnType="button"
                    // title={address ? "Create a campaign" : "Connect"}
                    // styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
                    handleClick={() => {
                      // if (address) navigate("create-scampaign");
                      // else connect();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
            {course.length > 0 &&
              course
                ?.filter((course) =>
                  course.course_name.toLowerCase().includes(ser.toLowerCase())
                )
                .map((u) => <Card det={u} />)}
            {course?.filter((course) =>
              course.course_name.toLowerCase().includes(ser.toLowerCase())
            ).length == 0 && (
              <div className="mt-[50px] text-white font-bold text-3xl">
                No Result Found
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewCourse;
