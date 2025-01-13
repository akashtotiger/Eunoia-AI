import React, { useState, useEffect } from "react";
import { TbLogout2 } from "react-icons/tb";
import { CiLogout } from "react-icons/ci";
import Typewriter from "typewriter-effect";
import { BsFillSendFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { fetchChatMessages, sendMessage } from "../api/chat";
import { useUser } from "../store/user.store";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAllMessages = async () => {
    if (!user?.accessToken) return;
    const data = await fetchChatMessages(user?.accessToken);
    if (data?.success) {
      setMessages(data.payload); // Fetch chat history from the server
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userMessage = { id: Date.now(), type: "sent", content: prompt };
    setMessages([...messages, userMessage]);
    setPrompt("");

    setLoading(true);
    try {
      const response = await sendMessage(user?.accessToken, prompt);
      setLoading(false);

      // Log the API response for debugging
      console.log("API Response:", response);

      // Ensure the correct response structure
      if (response?.data?.response) {
        const aiMessage = {
          id: Date.now() + 1,
          type: "received",
          content: response.data.response, // Correct key for AI response
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        alert("Failed to fetch response from AI.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error while sending message:", error);
      alert("Failed to fetch response from AI.");
    }
  };

  useEffect(() => {
    fetchAllMessages(); // Fetch messages on login
  }, [user]);

  useEffect(() => {
    if (!user) navigate("/login"); // Redirect if not logged in
  }, [user]);

  return (
    <main className="h-screen flex items-center justify-center bg-stone-800 p-3">
      <section className="rounded-xl h-full w-full bg-stone-900 flex">
        {/* Sidebar */}
        <div className="hidden md:flex flex-[0.18] rounded-xl rounded-r-none flex-col items-center justify-between py-10 px-4 gap-4 bg-stone-950 text-white">
          <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="text-3xl font-bold">
              <Typewriter
                options={{
                  strings: ["Eunoia AI", "Built by", "Akash"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h2>
            <div className="list-none flex flex-col items-center w-full gap-2 text-lg justify-center">
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
          <div className="w-full flex items-center justify-center">
            {/* Logout Button */}
            <button
              onClick={() => navigate("/login")}
              className="bg-transparent flex items-center justify-center gap-2 px-10 py-2 border border-red-700 text-red-700 rounded-tr-[12px] rounded-bl-[12px] hover:rounded-tl-[12px] hover:rounded-br-[12px] hover:rounded-tr-none hover:rounded-bl-none hover:bg-red-700 hover:text-white transition-all duration-200"
            >
              <span>Logout</span>
              <TbLogout2 />
            </button>
          </div>
        </div>

        {/* Chat Section */}
        <div className="md:flex-[0.82] rounded-tl-xl flex-1 flex flex-col rounded-xl md:rounded-tl-none rounded-l-none bg-stone-700 max-h-screen">
          <div className="p-4 flex md:hidden items-center justify-between md:rounded-tl-none bg-stone-600 rounded-t-xl">
            <h2 className="text-xl font-bold">
              <Typewriter
                options={{
                  strings: ["Eunoia AI", "Built by", "Akash"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h2>
            {/* Hamburger Menu (for mobile) */}
            <GiHamburgerMenu
              onClick={() => setIsOpen(!isOpen)}
              className="text-xl cursor-pointer md:hidden"
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

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`w-full flex ${
                  msg.type === "sent" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-md max-w-[70%] ${
                    msg.type === "sent" ? "bg-green-500" : "bg-black"
                  } text-white`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="px-4 py-2 rounded-md bg-black text-white">
                  Typing...
                </div>
              </div>
            )}
          </div>
          <form
            onSubmit={handleSendMessage}
            className="flex p-2 items-center justify-center gap-2"
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
