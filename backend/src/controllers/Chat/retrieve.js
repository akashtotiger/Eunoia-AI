import { History } from "../../models/history.model.js";
import ApiResponse from "../../utils/ApiResponse.js";

const getChat = async (req, res) => {
  try {
    const { _id } = req.user;

    const existingChatHistory = await History.findOne({ userId: _id });

    if (!existingChatHistory) {
      return res.status(200).send(new ApiResponse(200, [], "No messages yet."));
    }

    res
      .status(200)
      .send(
        new ApiResponse(
          200,
          existingChatHistory.chatHistory,
          "Fetched history successfully."
        )
      );
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, error, "Failed to get chat."));
  }
};

export default getChat;
