import mongoose from "mongoose";

export const messageSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["user", "ai"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
  },
  { timestamps: true }
);

export const Message = mongoose.model("message", messageSchema);
