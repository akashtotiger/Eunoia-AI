import env from "../../env/variables.js";
import { History } from "../../models/history.model.js";
import { Message } from "../../models/message.model.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

//using gemini API-keys
const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const sendMessage = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required fields missing."));
    }

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    const userMessage = await Message.create({
      type: "user",
      content: prompt,
    });

    const aiMessage = await Message.create({
      type: "ai",
      content: response,
    });

    const existingHistory = await History.findOne({ userId: req.user._id });

    if (!existingHistory) {
      const createdHistory = await History.create({
        userId: req.user._id,
        chatHistory: [],
      });
      createdHistory.chatHistory.push(userMessage);
      createdHistory.chatHistory.push(aiMessage);
      await createdHistory.save();

      return res.status(201).send({
        success: true,
        message: "Chat history updated",
        data: { response: aiMessage.content }, // Return the AI message content directly
      });
    }

    existingHistory.chatHistory.push(userMessage);
    existingHistory.chatHistory.push(aiMessage);

    await existingHistory.save();

    return res.status(201).send({
      success: true,
      message: "Message sent successfully.",
      data: { response: aiMessage.content }, // Return the AI message content directly
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send(new ApiResponse(500, error, "Failed to send message."));
  }
};

export default sendMessage;
