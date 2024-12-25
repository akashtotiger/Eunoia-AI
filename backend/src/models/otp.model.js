import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  code: {
    type: Number,
    required: true,
  },
  expiry: {
    type: Date,
    default: new Date(Date.now() + 600 * 1000),
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

export const OTP = mongoose.model("OTP", otpSchema);
