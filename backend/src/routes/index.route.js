import express from "express";
import userRouter from "./user.route.js";
import chatRouter from "./chat.route.js";

const indexRouter = express.Router();

indexRouter.use("/api/v1/users", userRouter);

indexRouter.use("/api/v1/chats", chatRouter);

export default indexRouter;
