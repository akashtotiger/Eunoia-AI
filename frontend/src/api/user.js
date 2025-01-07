import axios from "axios";
import API from "../utils/API";

const loginUser = async (data) => {
  try {
    const response = await axios.post(API.HOST + API.LOGIN, data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const registerUser = async (data) => {
  try {
    const response = await axios.post(API.HOST + API.REGISTER, data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const verifyMail = async () => {
  const { data } = await axios.post(API.HOST + API.VERIFY_EMAIL);
};

export { loginUser, registerUser };
