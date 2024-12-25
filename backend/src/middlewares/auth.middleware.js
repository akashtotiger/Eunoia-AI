import env from "../env/variables.js";
import ApiResponse from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const checkAuth = async (req, res, next) => {
  try {
    const bearerAuth = req.headers.authorization;

    if (!bearerAuth) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Missing bearer auth header."));
    }

    const token = bearerAuth.split(" ")[1];

    if (!token) {
      return res.status(400).send(new ApiResponse(400, null, "Missing token."));
    }

    const payload = jwt.verify(token, env.AT_SECRET);

    req.user = payload;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send(new ApiResponse(500, error, "Auth failed."));
  }
};

export default checkAuth;
