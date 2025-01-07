import React, { useState } from "react";
import { TbLogout2 } from "react-icons/tb";
import Typewriter from "typewriter-effect";
import conversation from "../data/chat";
import { BsFillSendFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { fetchChatMessages } from "../api/chat";
import { useUser } from "../store/user.store";

const Chat = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const [messages, setMessages] = useState(conversation);
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      id: messages[messages.length - 1].id + 1,
      type: "sent",
      content: prompt,
    };

    if (prompt.trim() !== "") {
      setMessages([...messages, data]);
      setPrompt("");
    }
  };

  const fetchAllMessages = async () => {
    const data = await fetchChatMessages(user?.accessToken);
    if (data?.success) {
      setMessages(data?.payload);
    }
  };

  React.useEffect(() => {
    fetchAllMessages();
  }, []);

  React.useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [user]);

  return (
    <main className="flex items-center justify-center h-screen p-3 bg-stone-800">
      <section className="flex w-full h-full rounded-xl bg-stone-900">
        {/* Left */}
        <div className="hidden md:flex flex-[0.18] rounded-xl rounded-r-none flex-col items-center justify-between py-10 px-4 gap-4 bg-stone-950 text-white">
          {/* Top */}
          <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="text-3xl font-bold">
              <Typewriter
                options={{
                  strings: ["Athena AI", "Built by", "ChatGPT"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h2>
            <div className="flex flex-col items-center justify-center w-full gap-2 text-lg list-none">
              <li className="cursor-pointer hover:underline hover:underline-offset-8">
                Features
              </li>
              <li className="cursor-pointer hover:underline hover:underline-offset-8">
                Developer
              </li>
              <li className="cursor-pointer hover:underline hover:underline-offset-8">
                Contact
              </li>
            </div>
          </div>
          {/* Bottom */}
          <div className="flex items-center justify-center w-full">
            <button
              onClick={() => navigate("/login")}
              className="bg-transparent flex items-center justify-center gap-2 px-10 py-2 border border-red-700 text-red-700 rounded-tr-[12px] rounded-bl-[12px] hover:rounded-tl-[12px] hover:rounded-br-[12px] hover:rounded-tr-none hover:rounded-bl-none hover:bg-red-700 hover:text-white transition-all duration-200"
            >
              <span>Logout</span>
              <TbLogout2 />
            </button>
          </div>
        </div>
        {/* Right */}
        <div className="md:flex-[0.82] rounded-tl-xl flex-1 flex flex-col rounded-xl md:rounded-tl-none rounded-l-none bg-stone-700 max-h-screen">
          <div className="flex items-center justify-between p-4 md:hidden md:rounded-tl-none bg-stone-600 rounded-t-xl">
            <h2 className="text-xl font-bold">
              <Typewriter
                options={{
                  strings: ["Athena AI", "Built by", "ChatGPT"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h2>
            <GiHamburgerMenu
              onClick={() => setIsOpen(!isOpen)}
              className={`cursor-pointer text-xl`}
            />
            {isOpen && (
              <div
                className={`flex w-[10rem] flex-col items-center justify-center list-none absolute top-14 right-7 px-4 py-3 rounded-xl gap-2 bg-stone-400`}
              >
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
                  onClick={() => navigate("/login")}
                  className={`mt-4 mb-2 flex items-center justify-center gap-2 px-8 py-2 rounded-full bg-red-500 group hover:scale-105 active:scale-95 shadow-xl transition-all duration-200`}
                >
                  <CiLogout />
                </button>
              </div>
            )}
          </div>
          {/* Conversation */}
          <div className="w-full p-2 overflow-y-auto">
            <div className="flex flex-col w-full h-full gap-4 p-2 overflow-y-auto md:gap-2">
              {messages.map((ele) => (
                <div
                  key={ele.id}
                  className={`w-full flex ${
                    ele.type === "sent" ? "justify-end" : "justify-start"
                  }`}
                >
                  <p
                    className={`text-white px-4 py-2 rounded-full ${
                      ele.type === "sent" ? "bg-green-600" : "bg-black"
                    }`}
                  >
                    {ele.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* Footer */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-center gap-2 p-2"
          >
            <input
              type="text"
              name="prompt"
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your message here"
              autoComplete="off"
              className="flex-1 bg-transparent focus-within:outline-none focus-within:border-blue-500 px-4 py-2 rounded-tr-[12px] rounded-bl-[12px] hover:rounded-tl-[12px] hover:rounded-br-[12px] hover:rounded-tr-none hover:rounded-bl-none border-2 border-black duration-200 transition-all font-semibold placeholder:text-stone-400 text-white text-lg"
            />
            <button
              className="bg-transparent border-black border-[2px] text-black text-xl font-bold p-3 bg-green-600 rounded-full hover:bg-green-500 hover:rotate-45 flex items-center justify-center duration-200 transition-all"
              type="submit"
            >
              <BsFillSendFill />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Chat;
