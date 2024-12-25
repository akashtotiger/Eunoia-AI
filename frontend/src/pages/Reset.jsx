import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Reset = () => {
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");

  const [validPassword, setValidPassword] = useState(false);

  useEffect(() => {
    // Update password validity
    setValidPassword(password.length > 0 && password === newPassword);
  }, [password, newPassword]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (otp.trim().length !== 6) {
      alert("Please enter a valid 6 digit OTP.");
      return;
    }

    if (!validPassword) {
      alert("Provided passwords don't match.");
      return;
    }

    // Everything is good, send to backend
    const data = { email, otp, newPassword: password };
    console.log(data);
  };

  const handleVerifyClick = () => {
    setOtpSent(true);
  };

  return (
    <main className="h-screen bg-stone-950 flex flex-col items-center justify-center text-white">
      <section className="bg-stone-900 border border-white p-8 md:px-20 md:py-10 flex flex-col items-center justify-center gap-3 rounded-tl-[48px] rounded-br-[48px]">
        <h3 className="text-2xl md:text-3xl my-2 font-semibold text-center max-w-[16rem]">
          Reset your password
        </h3>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center gap-3"
        >
          <input
            className="bg-transparent focus-within:border-blue-400 border border-white px-4 py-2 focus-within:outline-none min-w-[16rem] max-w-[18rem] rounded-tr-[12px] rounded-bl-[12px]"
            placeholder="Email"
            autoComplete="off"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {otpSent && (
            <div className="flex flex-col items-center justify-center gap-3">
              <input
                className="bg-transparent focus-within:border-blue-400 border border-white px-4 py-2 focus-within:outline-none min-w-[16rem] max-w-[18rem] rounded-tr-[12px] rounded-bl-[12px]"
                placeholder="OTP"
                type="number"
                name="otp"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <input
                className={`bg-transparent focus-within:border-blue-400 border px-4 py-2 focus-within:outline-none min-w-[16rem] max-w-[18rem] rounded-tr-[12px] rounded-bl-[12px] ${
                  password && password === newPassword
                    ? "border-green-500"
                    : "border-red-500"
                }`}
                placeholder="Password"
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className={`bg-transparent focus-within:border-blue-400 border px-4 py-2 focus-within:outline-none min-w-[16rem] max-w-[18rem] rounded-tr-[12px] rounded-bl-[12px] ${
                  password && password === newPassword
                    ? "border-green-500"
                    : "border-red-500"
                }`}
                placeholder="Confirm Password"
                type="password"
                name="newPassword"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                className="bg-white hover:scale-105 active:scale-95 text-black w-[10rem] py-2 rounded-tr-[12px] rounded-bl-[12px] hover:rounded-br-[12px] hover:rounded-tl-[12px] hover:rounded-tr-none hover:rounded-bl-none transition-all duration-200"
                type="submit"
              >
                Submit
              </button>
            </div>
          )}
          {!otpSent && (
            <button
              className="bg-white hover:scale-105 active:scale-95 text-black w-[10rem] py-2 rounded-tr-[12px] rounded-bl-[12px] hover:rounded-br-[12px] hover:rounded-tl-[12px] hover:rounded-tr-none hover:rounded-bl-none transition-all duration-200"
              onClick={handleVerifyClick}
            >
              Verify
            </button>
          )}
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="mt-5">
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer underline underline-offset-4"
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

export default Reset;
