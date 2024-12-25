import mongoose from "mongoose";
import { messageSchema } from "./message.model.js";

const historySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  chatHistory: {
    type: [messageSchema],
    default: [],
  },
});

export const History = mongoose.model("History", historySchema);
