import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import env from "../env/variables.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
    },
    env.AT_SECRET,
    { expiresIn: env.AT_EXPIRY }
  );
};

export const User = mongoose.model("User", userSchema);
