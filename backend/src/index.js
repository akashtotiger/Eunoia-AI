import http from "http";
import env from "./env/variables.js";
import app from "./app.js";
import connectDB from "./db/db.connect.js";
import { config } from "./utils/mailer.js";

const server = http.createServer(app);

const PORT = env.PORT;

await config(env.USER_EMAIL, env.APP_PASSWORD, env.SMTP_HOST, env.SMTP_PORT);

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
  });
});
