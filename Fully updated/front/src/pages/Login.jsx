import { OrbitControls, RoundedBox } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import icon from "../assets/icon.png";
import Title from "../components/Title";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const post = {
      email,
      password: pass,
    };
    console.log(post);
    axios
      .post("http://localhost:8989/api/v1/auth/authenticate", post)
      .then((r) => {
        // console.log(r.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: email,
            token: r.data.token,
            role: r.data.role,
          })
        );

        if (r.data.role === "Admin") navigate("/admin/home");
        else navigate("/user/home");
      })
      .catch((e) => {
        alert("Give valid credentials");
        console.log(e);
      });
    // }

    // });
  };
  return (
    <>
      <nav>
        <div class="fixed w-screen  z-50">
          <div class="flex justify-between px-10 shadow items-center bg-[#2D033B] h-[10vh]">
            <div class="flex items-center space-x-8">
              <div className="flex">
                <img className="h-[40x] w-[40px]" src={icon}></img>
                <Title />
              </div>
              <div class="hidden md:flex justify-around space-x-4"></div>
            </div>
            <div class="flex space-x-8 items-center">
              <Link to="/" class="text-white text-sm">
                HOME
              </Link>
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
      <div className="h-screen w-screen lg:flex bg-[#2D033B]">
        <div
          className="h-screen sm:w-screen lg:w-[50vw] order-2"
          data-aos="fade-left"
        >
          <div className="">
            <section class=" h-screen bg-[#2D033B]">
              <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div class="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-[#E5B8F4]">
                  <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Sign in to your account
                    </h1>
                    <form class="space-y-4 md:space-y-6" action="#">
                      <div>
                        <label
                          for="email"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={email}
                          onChange={(e) => [setEmail(e.target.value)]}
                          class="sm:text-sm rounded-lg   block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-[#E5B8F4] focus:border-[#E5B8F4]"
                          placeholder="name@company.com"
                          required=""
                        />
                      </div>
                      <div>
                        <label
                          for="password"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          placeholder="••••••••"
                          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required=""
                          value={pass}
                          onChange={(e) => [setPass(e.target.value)]}
                        />
                      </div>
                      <div class="flex items-center justify-between">
                        <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input
                              id="remember"
                              aria-describedby="remember"
                              type="checkbox"
                              class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                              required=""
                            />
                          </div>
                          <div class="ml-3 text-sm">
                            <label
                              for="remember"
                              class="text-gray-500 dark:text-gray-300"
                            >
                              Remember me
                            </label>
                          </div>
                        </div>
                        <a
                          href="#"
                          class="text-sm font-medium  hover:underline dark:text-primary-500 text-white"
                        >
                          Forgot password?
                        </a>
                      </div>
                      <button
                        type="submit"
                        class="w-full text-white bg-primary-600 hover:bg-[#c428f8] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  bg-[#C147E9]"
                        onClick={(e) => {
                          submitHandler(e);
                        }}
                      >
                        Sign in
                      </button>
                      <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don’t have an account yet?{" "}
                        <Link
                          to="/signup"
                          class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        >
                          Sign up
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="h-screen sm:w-screen md:w-screen lg:w-[50vw] order-1 bg-[#2D033B]">
          <div
            data-aos="fade-right"
            className="h-screen sm:w-screen md:w-screen lg:w-[50vw]"
          >
            <Canvas>
              <mesh scale={2.4}>
                <sphereGeometry></sphereGeometry>
                <ambientLight />
                <meshStandardMaterial wireframe color={"#E5B8F4"} />
                <OrbitControls autoRotate enableZoom={false} />
              </mesh>
            </Canvas>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
