import axios from "axios";

const API_BASE_URL = "http://localhost:7000/api/v1";

const fetchChatMessages = async (token) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/chats/retrieve`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    return { message: "Error retrieving messages", success: false, data: null };
  }
};

const sendMessage = async (token, prompt) => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/chats/send`,
      { prompt },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
    return { message: "Error sending message", success: false, data: null };
  }
};

export { fetchChatMessages, sendMessage };
