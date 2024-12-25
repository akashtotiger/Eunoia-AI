import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Reset from "./pages/Reset";
import Features from "./pages/Features";
import Developer from "./pages/Developer";
import Contact from "./pages/Contact";
import Chat from "./pages/Chat";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/features" element={<Features />} />
      <Route path="/developers" element={<Developer />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};

export default App;
