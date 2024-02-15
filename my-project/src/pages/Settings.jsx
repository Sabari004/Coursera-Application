import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AdminSideBar from "../components/AdminSideBar";
import axios from "axios";

const Settings = () => {
  const [title1, setTitle1] = useState("");
  const [title2, setTitle2] = useState("");
  const [desc1, setDesc1] = useState("");
  const [desc2, setDesc2] = useState("");

  const token1 = JSON.parse(localStorage.getItem("user")).token;
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token1}`;
    axios.get("http://localhost:8989/getSite/1").then((r) => {
      setTitle1(r.data.title);
      setDesc1(r.data.descr);
    });
    axios.get("http://localhost:8989/getSite/2").then((r) => {
      setTitle2(r.data.title);
      setDesc2(r.data.descr);
    });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8989/site", {
      id: 1,
      title: title1,
      descr: desc1,
    });
    axios
      .post("http://localhost:8989/site", {
        id: 2,
        title: title2,
        descr: desc2,
      })
      .then((r) => {
        alert("Success");
      });
  };

  return (
    <>
      <div className="relative sm:-8 p-4 bg-[#2D033B]  min-h-screen flex flex-row">
        <div className="sm:flex hidden mr-10 relative">
          <AdminSideBar />
        </div>
        <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
          <Navbar />
          <div className="mt-[70px] ml-5 w-[80vw]">
            <div className="w-[60vw]">
              {/* Navigation */}
              {/* <nav className="text-sm text-gray-500 grid gap-4 dark:text-gray-400">
                <a
                  className="font-semibold text-gray-900 dark:text-gray-50"
                  href="#"
                >
                  Home Page
                </a>
                <a href="#">Landing Page</a>
              </nav> */}

              {/* Banner Form */}

              {/* Featured Content Form */}
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm bg-white">
                <div className="flex flex-col space-y-1.5 p-6">
                  <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
                    Landing Page Featured Content 1
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Update the featured content for the landing page.
                  </p>
                </div>
                <div className="p-6">
                  <form className="flex flex-col gap-4">
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Featured Content Title"
                      value={title1}
                      onChange={(e) => {
                        setTitle1(e.target.value);
                      }}
                    />
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Featured Content Description"
                      value={desc1}
                      onChange={(e) => {
                        setDesc1(e.target.value);
                      }}
                    />
                  </form>
                </div>
              </div>
              <div className="mt-10 rounded-lg border bg-card text-card-foreground shadow-sm bg-white">
                <div className="flex flex-col space-y-1.5 p-6">
                  <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
                    Landing Page Featured Content 2
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Update the featured content for the landing page.
                  </p>
                </div>
                <div className="p-6">
                  <form className="flex flex-col gap-4">
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Featured Content Title"
                      value={title2}
                      onChange={(e) => {
                        setTitle2(e.target.value);
                      }}
                    />
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Featured Content Description"
                      value={desc2}
                      onChange={(e) => {
                        setDesc2(e.target.value);
                      }}
                    />
                  </form>
                </div>
                <div className="flex items-center border-t p-6 ">
                  <button
                    className="bg-black  text-white  inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    onClick={(e) => submitHandler(e)}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
