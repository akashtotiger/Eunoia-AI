import express from "express";
import chatController from "../controllers/chat.controller.js";
import checkAuth from "../middlewares/auth.middleware.js";

const chatRouter = express.Router();

chatRouter.route("/send").post(checkAuth, chatController.send);

chatRouter.route("/retrieve").get(checkAuth, chatController.retrieve);

export default chatRouter;
