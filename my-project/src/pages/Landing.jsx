import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import icon from "../assets/icon.png";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  RoundedBox,
  ScrollControls,
  Scroll,
  OrbitControls,
  Environment,
  Sparkles,
  Backdrop,
  Float,
  Ring,
} from "@react-three/drei";
import { useRef } from "react";

import gsap from "gsap"; // <-- import GSAP
import { useGSAP } from "@gsap/react";
import LandModel from "../components/LandModel";
import { Room } from "../components/Room";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import axios from "axios";
const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
}) => (
  <div className="bg-black-200 p-10 rounded-3xl xs:w-[320px] w-full">
    <p className="text-white font-black text-[48px]">"</p>

    <div className="mt-1">
      <p className="text-white tracking-wider text-[18px]">{testimonial}</p>

      <div className="mt-7 flex justify-between items-center gap-1">
        <div className="flex-1 flex flex-col">
          <p className="text-white font-medium text-[16px]">
            <span className="blue-text-gradient">@</span> {name}
          </p>
          <p className="mt-1 text-secondary text-[12px]">
            {designation} of {company}
          </p>
        </div>

        <img
          src={image}
          alt={`feedback_by-${name}`}
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
    </div>
  </div>
);

const Landing = () => {
  const container = useRef();
  const navigate = useNavigate();
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
  });

  useGSAP(
    () => {
      // gsap code here...
      gsap.to(".box", { rotation: 180 }); // <-- automatically reverted
    },
    { scope: container }
  );

  return (
    <>
      <nav>
        <div class="">
          <div class="flex justify-between px-10 shadow items-center bg-[#2D033B] h-[10vh]">
            <div class="flex items-center space-x-8">
              <div className="flex">
                <img className="h-[40x] w-[40px]" src={icon}></img>
                <Title />
              </div>
              <div class="hidden md:flex justify-around space-x-4"></div>
            </div>
            <div class="flex space-x-8 items-center">
              <Link to="/Contact" class="text-white text-sm">
                CONTACT
              </Link>
              <Link to="/login" class="text-white text-sm">
                LOGIN
              </Link>
              <Link
                to="/signup"
                class="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm"
              >
                SIGNUP
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <Canvas style={{ height: "90vh", overflowX: "hidden" }}>
        <color attach="background" args={["#2D033B"]} />

        <Environment
          // background // can be true, false or "only" (which only sets the background) (default: false)
          preset={"warehouse"}
        />
        <ScrollControls pages={6} damping={0.1}>
          <LandModel />
          <mesh position={[0, 0, 3]}>
            <Sparkles size={2} color={"#fff"} scale={[10, 10, 10]}></Sparkles>
          </mesh>
          {/* <Room /> */}
          {/* <Sparkles size={2} color={"#fff"} scale={[10, 10, 10]}></Sparkles> */}

          <Scroll></Scroll>
          <Scroll html style={{ width: "100%" }}>
            {/* DOM contents in here will scroll along */}
            <div className="canva">
              <h1
                className="title"
                style={{
                  color: "#cdcbca",
                  position: "absolute",
                  top: `65vh`,
                  left: "50%",
                  fontSize: "13em",
                  transform: `translate(-50%,-50%)`,
                }}
              >
                EDUAID
              </h1>
            </div>
            <div className="canva">
              <div
                className="row"
                style={{ position: "absolute", top: `122vh` }}
              >
                <h2>
                  {/* Be a Man of the Future. */}
                  {title1}
                </h2>
                <p style={{ maxWidth: "400px" }}>
                  {/* Featuring a sleek, metallic design inspired by advanced
                  technology, this aftershave bottle is as stylish as it is
                  functional. But it's not just a pretty face - inside, you'll
                  find a nourishing and protective aftershave formula that will
                  leave your skin feeling refreshed and hydrated. */}
                  {desc1}
                </p>
                <button>Read more</button>
              </div>
            </div>

            <div
              className="canva row"
              style={{ position: "absolute", top: `210vh`, width: "100vw" }}
            >
              <div
                className="col"
                style={{ right: `40px`, width: "540px", float: "right" }}
              >
                <h2 style={{ maxWidth: "440px" }}>{title2}</h2>
                <p style={{ maxWidth: "440px" }}>{desc2}</p>
                <button>Read more</button>
              </div>
            </div>
            <div className="canva">
              <h2
                // className=" canva "
                style={{
                  position: "absolute",
                  top: "320vh",
                  left: "50%",
                  transform: `translate(-50%,-50%)`,
                }}
              >
                Cutting-Edge of Grooming
              </h2>
            </div>

            <button
              className="canva p-5"
              style={{
                position: "absolute",
                top: `490vh`,
                left: "50%",
                transform: `translate(-50%,-50%)`,
                backgroundColor: "#C147E9",
                height: "80px",
                fontSize: "30px",
              }}
            >
              GET STARTED
            </button>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </>
  );
};

export default Landing;
