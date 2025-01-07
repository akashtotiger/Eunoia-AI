import axios from "axios";

const fetchChatMessages = async (token) => {
  try {
    const { data } = await axios.get(
      "http://localhost:7000/api/v1/chats/retrieve",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    return {
      message: "error",
      success: false,
      data: null,
    };
  }
};

// SEND MESSAGE API

export { fetchChatMessages };
