import { User } from "../../models/user.model.js";
import ApiResponse from "../../utils/ApiResponse.js";
import bcrypt from "bcrypt";

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required fields missing."));
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(404)
        .send(new ApiResponse(404, null, "Invalid credentials."));
    }

    const verified = await bcrypt.compare(password, existingUser.password);

    if (!verified) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Invalid credentials."));
    }

    const at = existingUser.generateAccessToken();

    res.cookie("at", at);

    res
      .status(200)
      .send(
        new ApiResponse(
          200,
          { accessToken: at },
          "User logged in successfully."
        )
      );
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, error, "Failed to log user in."));
  }
};

export default loginUser;
