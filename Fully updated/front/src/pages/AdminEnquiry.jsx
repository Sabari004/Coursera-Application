import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AdminSideBar from "../components/AdminSideBar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReplyCard = ({ det }) => {
  const [reply, setReply] = useState("");
  if (det.reply !== null) {
    return <></>;
  }
  return (
    <div
      className="border p-5 bg-white border-gray-200 rounded-lg dark:border-gray-800"
      data-id="4"
    >
      <div className="flex flex-col p-4" data-id="5">
        <div className="flex items-center justify-between" data-id="6">
          <div className="flex items-center gap-2" data-id="7">
            <span
              className="relative flex shrink-0 overflow-hidden rounded-full h-8 w-8"
              data-id="8"
            >
              <img
                className="aspect-square h-full w-full"
                alt="@shadcn"
                data-id="9"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeHt2GDofV5sNOaTrLarqU3XmMpTNXxaw9dg&usqp=CAU"
              />
            </span>
            <div className="grid gap-1" data-id="11">
              <div className="font-semibold" data-id="12">
                {det.userModel.user.name}
              </div>
              <div
                className="text-xs text-gray-500 dark:text-gray-400"
                data-id="13"
              >
                {det.userModel.email}
              </div>
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm text-black font-semibold" data-id="15">
          {det.courseModel.course_name}
        </p>
        <p
          className="mt-4 text-sm text-gray-500 dark:text-gray-400"
          data-id="15"
        >
          {det.description}
        </p>
      </div>
      <form
        className="border-t border-gray-200 dark:border-gray-800"
        data-id="16"
      >
        <textarea
          className="border-black flex min-h-[80px] rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full p-4"
          placeholder="Write your reply..."
          data-id="17"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
        ></textarea>
        <div
          className="flex justify-end p-4 border-t border-gray-200 dark:border-gray-800"
          data-id="18"
        >
          <button
            className=" bg-black text-white inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3"
            type="submit"
            data-id="19"
            onClick={(e) => {
              e.preventDefault();
              axios
                .post(
                  `http://localhost:8989/updateEnquiry/${det.enquiry_id}/${reply}`
                )
                .then((r) => {
                  toast.success("Successfully Replied");
                });
            }}
          >
            Send Reply
          </button>
        </div>
      </form>
    </div>
  );
};
const AdminEnquiry = () => {
  const [enquiry, setEnquiry] = useState([]);
  const token = JSON.parse(localStorage.getItem("user")).token;
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.get(`http://localhost:8989/getEnquiry`).then((r) => {
      setEnquiry(r.data);
      // console.log(r.data);
    });
  }, []);
  return (
    <>
      <div className="relative sm:-8 p-4 bg-[#2D033B]  min-h-screen flex flex-row">
        <ToastContainer />
        <div className="sm:flex hidden mr-10 relative">
          <AdminSideBar />
        </div>
        <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
          <Navbar />
          <div className="mt-[70px] ml-5 w-[80vw]">
            <div
              id="v0-container"
              className="!visible transition-opacity duration-150 !opacity-100"
              style={{ visibility: "hidden", opacity: 0 }}
            >
              <div className="w-full max-w-2xl mx-auto" data-id="1">
                <h1 className="text-white text-2xl font-bold mb-6" data-id="2">
                  User Enquiries
                </h1>
                {/* User Enquiry 1 */}

                {enquiry.length > 0 &&
                  enquiry.map((u) => <ReplyCard det={u} />)}

                {/* User Enquiry 2 */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminEnquiry;
