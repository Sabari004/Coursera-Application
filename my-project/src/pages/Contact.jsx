import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Title from "../components/Title";
import { EarthCanvas } from "../components/canvas";
import icon from "../assets/icon.png";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_6im3npn",
        "template_ooox81q",
        {
          from_name: form.name,
          to_name: "JavaScript Mastery",
          from_email: form.email,
          to_email: "sujata@jsmastery.pro",
          message: form.message,
        },
        "GUvmNB1WoRSnMC-zs"
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

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
      <div
        className={` bg-[#2D033B]   flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
      >
        <div className="flex-[0.75] bg-black-100 px-8 pb-8  rounded-2xl">
          <p className="text-white font-black md:text-[50px] sm:text-[50px] xs:text-[40px] text-[30px]">
            Get in touch
          </p>
          <h3 className=" text-white sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider">
            Contact.
          </h3>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-12 flex flex-col gap-8"
          >
            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your good name?"
                className="bg-tertiary py-4 px-6 placeholder:text-secondary  rounded-lg outline-none border-none font-medium"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What's your web address?"
                className="bg-tertiary py-4 px-6 placeholder:text-secondary  rounded-lg outline-none border-none font-medium"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your Message</span>
              <textarea
                rows={7}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What you want to say?"
                className="bg-tertiary py-4 px-6 placeholder:text-secondary  rounded-lg outline-none border-none font-medium"
              />
            </label>

            <button
              type="submit"
              className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>

        <div className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]">
          <EarthCanvas />
        </div>
      </div>
    </>
  );
};

export default Contact;
