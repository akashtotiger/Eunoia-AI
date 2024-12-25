import "dotenv/config";

const env = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  AT_SECRET: process.env.AT_SECRET,
  AT_EXPIRY: process.env.AT_EXPIRY,
  OTP_SECRET: process.env.OTP_SECRET,
  USER_EMAIL: process.env.USER_EMAIL,
  APP_PASSWORD: process.env.APP_PASSWORD,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
};

for (let key in env) {
  if (!env[key]) {
    console.log(`Missing key: ${key} in .env file`);
    process.exit(1);
  }
}

export default env;
