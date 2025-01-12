import React, { useState, useEffect } from "react";
import { TbLogout2 } from "react-icons/tb";
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
          content: response.data.response,  // Correct key for AI response
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
    <main className="flex items-center justify-center h-screen p-3 bg-stone-800">
      <section className="flex w-full h-full rounded-xl bg-stone-900">
        {/* Sidebar */}
        <div className="hidden md:flex flex-[0.18] flex-col items-center justify-between py-10 px-4 gap-4 bg-stone-950 text-white">
          <h2 className="text-3xl font-bold mb-6">
            <Typewriter
              options={{
                strings: ["Athena AI", "Built by ChatGPT"],
                autoStart: true,
                loop: true,
              }}
            />
          </h2>

          {/* Features */}
          <div className="flex flex-col gap-4 mb-6">
            <ul>
              <li>Features</li>
              <li>Developer</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Logout Button */}
          <button
            onClick={() => navigate("/login")}
            className="flex items-center justify-center gap-2 px-10 py-2 border border-red-700 text-red-700 rounded hover:bg-red-700 hover:text-white absolute bottom-6"
          >
            <span>Logout</span>
            <TbLogout2 />
          </button>
        </div>

        {/* Chat Section */}
        <div className="flex-1 flex flex-col bg-stone-700">
          <div className="p-4 bg-stone-600">
            {/* Hamburger Menu (for mobile) */}
            <GiHamburgerMenu
              onClick={() => setIsOpen(!isOpen)}
              className="text-xl cursor-pointer md:hidden"
            />
            {isOpen && (
              <div className="absolute top-14 left-4 bg-stone-400 p-4 rounded-xl md:hidden">
                <ul>
                  <li>Features</li>
                  <li>Developer</li>
                  <li>Contact</li>
                </ul>
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
                  className={`p-3 rounded max-w-[70%] ${
                    msg.type === "sent" ? "bg-green-500" : "bg-black"
                  } text-white`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="p-3 rounded bg-black text-white">Typing...</div>
              </div>
            )}
          </div>
          <form
            onSubmit={handleSendMessage}
            className="flex gap-2 p-4 bg-stone-800"
          >
            <input
              type="text"
              placeholder="Type your message"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 p-2 rounded border border-gray-600 bg-stone-700 text-white"
            />
            <button
              type="submit"
              className="p-3 bg-green-600 text-white rounded"
              disabled={loading}
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
