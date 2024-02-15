import { OrbitControls, RoundedBox } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import icon from "../assets/icon.png";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const token1 = JSON.parse(localStorage.getItem("user")).token;
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token1}`;
  }, []);
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8989/api/v1/auth/register", {
        name,
        email,
        password: pass,
      })
      .then((r) => {
        console.log(r.data.token);
        axios
          .get(`http://localhost:8989/api/v1/auth/getuser/${email}`)
          .then((e) => {
            localStorage.setItem(
              "user",
              JSON.stringify({
                id: e.data.id,
                email: email,
                pass: pass,
                token: r.data.token,
                phone: null,
                college: null,
                dob: null,
                name: e.data.name,
              })
            );
          });
        dispatch(
          login({
            username: email,
          })
        );
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: email,
            pass: pass,
            token: r.data.token,
          })
        );
        if (email.substring(0, 5).toLowerCase() === "admin")
          navigate("/admin/home");
        else navigate("/user/home");
      })
      .catch((e) => {
        alert("Give valid credentials");
      });
    // }
    // });
  };
  return (
    <>
      <nav>
        <div class="fixed w-screen z-50">
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
          className="h-screen sm:w-screen lg:w-[50vw] "
          data-aos="fade-right"
        >
          <div className="">
            <section class=" h-screen bg-[#2D033B]">
              <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div class="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-[#E5B8F4]">
                  <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Register
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
                          class="sm:text-sm rounded-lg   block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-[#E5B8F4] focus:border-[#E5B8F4]"
                          placeholder="name@company.com"
                          required=""
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </div>
                      <div>
                        <label
                          for="username"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Username
                        </label>
                        <input
                          type="username"
                          name="username"
                          id="username"
                          class="sm:text-sm rounded-lg   block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-[#E5B8F4] focus:border-[#E5B8F4]"
                          placeholder="username"
                          required=""
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
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
                          onChange={(e) => {
                            setPass(e.target.value);
                          }}
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
                      </div>
                      <button
                        type="submit"
                        class="w-full text-white bg-primary-600 hover:bg-[#c428f8] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  bg-[#C147E9]"
                        onClick={(e) => {
                          submitHandler(e);
                        }}
                      >
                        Register
                      </button>
                      <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                        Already have an account?{" "}
                        <a
                          href="#"
                          class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        >
                          Sign in
                        </a>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="h-screen sm:w-screen md:w-screen lg:w-[50vw]  bg-[#2D033B]">
          <div
            data-aos="fade-left"
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

export default SignUp;
