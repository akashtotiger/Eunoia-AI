import { User } from "../../models/user.model.js";
import ApiResponse from "../../utils/ApiResponse.js";
import bcrypt from "bcrypt";
import { sendEmail } from "../../utils/mailer.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required fields missing."));
    }

    const alreadyExists = await User.findOne({ email });

    if (alreadyExists) {
      return res
        .status(409)
        .send(
          new ApiResponse(
            409,
            null,
            "User ID with the provided email already exists. Use a different email, or login to your account."
          )
        );
    }

    const hashed = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      name,
      email,
      password: hashed,
    });

    const at = createdUser.generateAccessToken();

    res.cookie("at", at);

    const content = `Dear User,<br /><br />Thank you for creating an account with Athena AI. Here are a list of features.<br /><br />...Features...`;

    await sendEmail(email, "Welcome to Athena AI", content);

    res
      .status(201)
      .send(
        new ApiResponse(
          201,
          { accessToken: at },
          "User account created successfully."
        )
      );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Failed to register user."));
  }
};

export default registerUser;
