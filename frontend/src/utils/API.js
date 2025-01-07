const mode = process.send.MODE ?? "LOCAL";

const API = {
  HOST: "",
  REGISTER: "/api/v1/users/register",
  LOGIN: "/api/v1/users/login",
  RESET_PASSWORD: "/api/v1/users/resetPassword",
  VERIFY_EMAIL: "/api/v1/users/sendMail",
};

if (mode === "LOCAL") {
  API.HOST = "http://localhost:7000";
}

if (mode === "LIVE") {
  API.HOST = "https://domain.in";
}

module.exports = API;
