import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaPlus } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { IoSunnyOutline } from "react-icons/io5";
import { IoSunnySharp } from "react-icons/io5";
import { useUser } from "../store/user.store";

const HomePage = () => {
  const navigate = useNavigate();
  const { user, clearUser } = useUser();

  console.log(user);

  const [isOpen, setIsOpen] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);

  React.useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [user]);

  return (
    <main
      className={`h-screen flex flex-col items-center justify-center text-white px-8 lg:px-32 py-5 ${
        darkTheme ? "bg-stone-950" : "bg-stone-200 text-black"
      }`}
    >
      <nav className="flex items-center justify-between w-full p-2">
        <h2
          className={`text-2xl cursor-pointer font-bold ${
            darkTheme ? "text-white" : "text-black"
          }`}
        >
          Eunoia AI
        </h2>
        <div className="relative flex items-center justify-center xl:hidden">
          <GiHamburgerMenu
            onClick={() => setIsOpen(!isOpen)}
            className={`cursor-pointer text-xl ${
              darkTheme ? "text-white" : "text-black"
            }`}
          />
          {isOpen && (
            <div
              className={`flex w-[14rem] flex-col items-center justify-center list-none absolute top-10 right-0 ${
                darkTheme
                  ? "text-white  bg-stone-900"
                  : "text-black bg-stone-400"
              } px-8 py-6 rounded-xl gap-2`}
            >
              <div
                onClick={() => setDarkTheme(!darkTheme)}
                className={`p-1 rounded-full ${
                  darkTheme ? "text-white" : "text-black"
                } text-white cursor-pointer`}
              >
                {darkTheme ? (
                  <p className={`${darkTheme ? "text-white" : "text-black"}`}>
                    Light Mode
                  </p>
                ) : (
                  <p className={`${darkTheme ? "text-white" : "text-black"}`}>
                    Dark Mode
                  </p>
                )}
              </div>
              <li
                onClick={() => navigate("/features")}
                className="cursor-pointer hover:underline hover:underline-offset-8"
              >
                Features
              </li>
              <li
                onClick={() => navigate("/developer")}
                className="cursor-pointer hover:underline hover:underline-offset-8"
              >
                Developer
              </li>
              <li
                onClick={() => navigate("/contact")}
                className="cursor-pointer hover:underline hover:underline-offset-8"
              >
                Contact
              </li>
              <button
                onClick={() => {
                  clearUser();
                }}
                className={`mt-4 mb-2 flex items-center justify-center gap-2 px-8 py-2 rounded-full bg-red-500 group hover:scale-105 active:scale-95 shadow-xl transition-all duration-200`}
              >
                <CiLogout />
              </button>
            </div>
          )}
        </div>
        <div
          className={`hidden xl:flex items-center justify-center gap-4 text-lg ${
            darkTheme ? "text-white" : "text-black bg-transparent"
          }`}
        >
          <ul className="flex items-center justify-center gap-4 list-none">
            <div
              onClick={() => setDarkTheme(!darkTheme)}
              className={`p-1 rounded-full ${
                darkTheme ? "text-white" : "text-black"
              } text-white text-3xl cursor-pointer`}
            >
              {darkTheme ? (
                <IoSunnyOutline color={darkTheme ? "#fff" : "#111"} />
              ) : (
                <IoSunnySharp color={darkTheme ? "#fff" : "#111"} />
              )}
            </div>
            <li
              onClick={() => navigate("/features")}
              className="cursor-pointer hover:underline hover:underline-offset-8"
            >
              Features
            </li>
            <li
              onClick={() => navigate("/developer")}
              className="cursor-pointer hover:underline hover:underline-offset-8"
            >
              Developer
            </li>
            <li
              onClick={() => navigate("/contact")}
              className="cursor-pointer hover:underline hover:underline-offset-8"
            >
              Contact
            </li>
          </ul>
          <button
            onClick={() => navigate("/login")}
            className={`flex items-center justify-center gap-2 bg-transparent ${
              darkTheme
                ? "border-white border text-white hover:bg-red-800"
                : "border-black border text-black hover:bg-red-500"
            } px-8 py-2 rounded-full group hover:scale-105 active:scale-95 shadow-xl transition-all duration-200 `}
          >
            <span>Logout</span>
            <CiLogout className="group-hover:translate-x-[15px] transition-all duration-200" />
          </button>
        </div>
      </nav>
      <section className="flex flex-col items-center justify-center w-full h-full gap-5">
        <h2
          className={`text-4xl max-w-sm text-center font-bold ${
            darkTheme ? "text-white" : "text-black"
          }`}
        >
          The smartest AI you've ever seen
        </h2>
        <p
          className={`text-lg max-w-md text-center ${
            darkTheme ? "text-white" : "text-black"
          }`}
        >
          Empower your journey with Eunoia AI — the ultimate platform for
          insights, automation, and intelligent solutions, designed to elevate
          your productivity and decision-making.
        </p>
        <button
          onClick={() => navigate("/chat")}
          className={`hover:scale-105 active:scale-95 w-[10rem] py-2 rounded-tr-[12px] rounded-bl-[12px] hover:rounded-br-[12px] hover:rounded-tl-[12px] hover:rounded-tr-none hover:rounded-bl-none transition-all duration-200 ${
            darkTheme ? "bg-white text-black" : "bg-black text-white"
          }`}
        >
          Get Started
        </button>
      </section>
    </main>
  );
};

export default HomePage;
