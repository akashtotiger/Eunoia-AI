import getChat from "./Chat/retrieve.js";
import sendMessage from "./Chat/send.js";

const chatController = {
  send: sendMessage,
  retrieve: getChat,
};

export default chatController;
