import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { loginUser } from "../api/user";
import { useUser } from "../store/user.store";

const Login = () => {
  const navigate = useNavigate();

  const { user, setUser } = useUser();

  console.log(user);

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    toast("Logged in...");
    const result = await loginUser({ email, password });
    setUser(result?.payload);
    if (result?.success) {
      setIsLoading(false);
      navigate("/");
    }
  };

  // React.useEffect(() => {
  //   if (user !== null) {
  //     navigate("/");
  //   }
  // }, [user]);

  return (
    <main className="flex flex-col items-center justify-center h-screen text-white bg-stone-950">
      <section className="bg-stone-900 border border-white p-8 md:px-20 md:py-10 flex flex-col items-center justify-center gap-3 rounded-tl-[48px] rounded-br-[48px]">
        <h3 className="text-2xl md:text-4xl font-semibold text-center max-w-[16rem]">
          Sign in to your account
        </h3>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center gap-3"
        >
          <input
            className="bg-transparent focus-within:border-blue-400 border border-white px-4 py-2 focus-within:outline-none min-w-[16rem] max-w-[18rem] rounded-tr-[12px] rounded-bl-[12px]"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            type="email"
            name="email"
            id="email"
          />
          <input
            className="bg-transparent focus-within:border-blue-400 border border-white px-4 py-2 focus-within:outline-none min-w-[16rem] max-w-[18rem] rounded-tr-[12px] rounded-bl-[12px]"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
          />
          <button
            className="bg-white hover:scale-105 active:scale-95 text-black w-[10rem] py-2 rounded-tr-[12px] rounded-bl-[12px] hover:rounded-br-[12px] hover:rounded-tl-[12px] hover:rounded-tr-none hover:rounded-bl-none transition-all duration-200 flex items-center justify-center"
            type="submit"
          >
            {isLoading ? (
              <ClipLoader
                color={"#000"}
                loading={isLoading}
                size={22}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              <span>Sign in</span>
            )}
          </button>
          <div className="flex flex-col items-center justify-center gap-2">
            <p
              className="text-blue-600 underline cursor-pointer underline-offset-4"
              onClick={() => navigate("/reset")}
            >
              Forgot Password?
            </p>
            <p className="mt-5">
              Don't have an account?{" "}
              <span
                className="text-blue-600 underline cursor-pointer underline-offset-4"
                onClick={() => navigate("/register")}
              >
                Sign up
              </span>
            </p>
          </div>
        </form>
      </section>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </main>
  );
};

export default Login;
