import env from "../../env/variables.js";
import { OTP } from "../../models/otp.model.js";
import { User } from "../../models/user.model.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { sendEmail } from "../../utils/mailer.js";
import { TOTP } from "totp-generator";

const sendMail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required fields missing."));
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(404)
        .send(
          new ApiResponse(
            404,
            null,
            "Account with the provided details does not exist."
          )
        );
    }

    const existingOtp = await OTP.findOne({ email });

    if (existingOtp) {
      const { otp, expires } = TOTP.generate(env.OTP_SECRET, {
        digits: 6,
        period: 600,
      }); // 10 minutes = 600 s

      existingOtp.code = otp;
      existingOtp.expiry = expires;
      await existingOtp.save();

      const content = `Dear User,<br /><br />We have received a request to reset your password for <b>Athena AI</b><br/>If this request was not made by you, you can ignore this email.<br /><br />Your OTP to reset your password is: <b>${otp}</b><br />Please note that it will expire in <b>10 minutes,</b>`;

      await sendEmail(email, "Request for Password Reset", content);

      return res
        .status(200)
        .send(new ApiResponse(200, null, "OTP resent successfully."));
    }

    const { otp, expires } = TOTP.generate(env.OTP_SECRET, {
      digits: 6,
      period: 600,
    }); // 10 minutes = 600 s

    await OTP.create({
      code: otp,
      email,
      expiry: expires,
    });

    const content = `Dear User,<br /><br />We have received a request to reset your password for <b>Athena AI</b><br/>If this request was not made by you, you can ignore this email.<br /><br />Your OTP to reset your password is: <b>${otp}</b><br />Please note that it will expire in <b>10 minutes,</b>`;

    await sendEmail(email, "Request for Password Reset", content);

    res
      .status(201)
      .send(
        new ApiResponse(201, null, "OTP sent to provided email successfully.")
      );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Failed to send reset link."));
  }
};

export default sendMail;
