import React from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/user";
import { toast } from "react-toastify"; // Added toast notification

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await registerUser({ name, email, password });
    
    if (res?.success) {
      toast.success("Account created successfully. Redirecting...");
      navigate("/"); // Navigate to home after successful registration
    } else {
      toast.error(res?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen text-white bg-stone-950">
      <section className="bg-stone-900 border border-white p-8 md:px-20 md:py-10 flex flex-col items-center justify-center gap-3 rounded-tl-[48px] rounded-br-[48px]">
        <h3 className="text-2xl md:text-4xl font-semibold text-center max-w-[16rem]">
          Create an account now
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-3">
          <input
            className="bg-transparent focus-within:border-blue-400 border border-white px-4 py-2 focus-within:outline-none min-w-[16rem] max-w-[18rem] rounded-tr-[12px] rounded-bl-[12px]"
            placeholder="Name"
            autoComplete="off"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            name="name"
            id="name"
          />
          <input
            className="bg-transparent focus-within:border-blue-400 border border-white px-4 py-2 focus-within:outline-none min-w-[16rem] max-w-[18rem] rounded-tr-[12px] rounded-bl-[12px]"
            placeholder="Email"
            autoComplete="off"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            name="email"
            id="email"
          />
          <input
            className="bg-transparent focus-within:border-blue-400 border border-white px-4 py-2 focus-within:outline-none min-w-[16rem] max-w-[18rem] rounded-tr-[12px] rounded-bl-[12px]"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            name="password"
            id="password"
          />
          <button
            className="bg-white hover:scale-105 active:scale-95 text-black w-[10rem] py-2 rounded-tr-[12px] rounded-bl-[12px] hover:rounded-br-[12px] hover:rounded-tl-[12px] hover:rounded-tr-none hover:rounded-bl-none transition-all duration-200"
            type="submit"
          >
            Sign up
          </button>
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="mt-5">
              Already have an account?{" "}
              <span
                className="text-blue-600 underline cursor-pointer underline-offset-4"
                onClick={() => navigate("/login")}
              >
                Sign in
              </span>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Register;
