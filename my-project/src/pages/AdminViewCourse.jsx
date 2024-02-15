import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import AdminSideBar from "../components/AdminSideBar";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Avatar,
} from "@chakra-ui/react";
import CourseDetails from "./CourseDetails";

const Card = ({ det }) => {
  const navigate = useNavigate();
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const fetchData = (id) => {
    navigate("/admin/coursedetails/" + id);
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
            onClick={(e) => {
              fetchData(det.course_id);
            }}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};
const AdminViewCourse = () => {
  const [course, setCourse] = useState([]);
  const [showModel, setShowMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [duration, setDuration] = useState("");
  const [inst, setInst] = useState("");
  const [desc, setDesc] = useState("");
  const [imgurl, setImgurl] = useState("");
  const [fees, setFees] = useState("");
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
  const [user, setUser] = useState({
    companyname: "Zoho",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    role: "adimin",
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const navigate = useNavigate();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const token1 = JSON.parse(localStorage.getItem("user")).token;
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token1}`;
    axios.get("http://localhost:8989/getAllCourses").then((r) => {
      setCourse(r.data);
    });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8989/admin/postCourses", {
        course_id: 1,
        course_name: courseName,
        description: desc,
        fees: fees,
        duration: duration,
        instructor: inst,
        img_url: imgurl,
        level: "Medium",
      })
      .then((r) => {
        alert("Course Added");
      });
  };
  return (
    <>
      <div className="relative sm:-8 p-4 bg-[#2D033B]  min-h-screen flex flex-row">
        <div
          className="w-12 h-12 bg-yellow-500 fixed z-40 text-white rounded-full text-lg flex items-center justify-center  bottom-0 right-0 m-3 hover:bg-yellow-600 hover:scale-110"
          variant="outline"
          onClick={onOpen}
        >
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
        </div>
        <div className="sm:flex hidden mr-10 relative">
          <AdminSideBar />
        </div>
        <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
          <Navbar />
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
            {course.length > 0 && course?.map((u) => <Card det={u} />)}
          </div>
        </div>
      </div>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader> Add Course</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="grid gap-6">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm bg-white">
                <div className="flex flex-col space-y-1.5 p-6">
                  <p className="text-sm text-muted-foreground">
                    Make a course of your own style
                  </p>
                </div>
                <div className="p-6">
                  <form className="flex flex-col gap-4">
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Course Title"
                      type="text"
                      value={courseName}
                      onChange={(e) => setCourseName(e.target.value)}
                      // value={bannerText}
                      // onChange={(e) => setBannerText(e.target.value)}
                    />
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Course Description"
                      type="text"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      // value={bannerText}
                      // onChange={(e) => setBannerText(e.target.value)}
                    />
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Course Image URL"
                      type="text"
                      value={imgurl}
                      onChange={(e) => setImgurl(e.target.value)}
                      // value={bannerImageUrl}
                      // onChange={(e) => setBannerImageUrl(e.target.value)}
                    />
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Course Instructor"
                      type="text"
                      value={inst}
                      onChange={(e) => setInst(e.target.value)}
                      // value={bannerImageUrl}
                      // onChange={(e) => setBannerImageUrl(e.target.value)}
                    />
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Course Duration"
                      type="text"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      // value={bannerImageUrl}
                      // onChange={(e) => setBannerImageUrl(e.target.value)}
                    />
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Fees"
                      // value={bannerImageUrl}
                      type="number"
                      value={fees}
                      onChange={(e) => setFees(e.target.value)}
                      // onChange={(e) => setBannerImageUrl(e.target.value)}
                    />
                  </form>
                </div>
                <div className="flex items-center border-t p-6">
                  <button
                    className=" bg-black  text-white inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    // onClick={handleBannerSave}
                    onClick={(e) => handleSubmit(e)}
                  >
                    Add..
                  </button>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AdminViewCourse;
