import loginUser from "./User/login.js";
import sendMail from "./User/mail.js";
import registerUser from "./User/register.js";
import resetPassword from "./User/reset.js";

const userController = {
  login: loginUser,
  register: registerUser,
  forgot: sendMail,
  reset: resetPassword,
};

export default userController;
