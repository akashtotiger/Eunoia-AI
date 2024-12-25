import axios from "axios";

const loginUser = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:7000/api/v1/users/login",
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const registerUser = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:7000/api/v1/users/register",
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { loginUser, registerUser };
