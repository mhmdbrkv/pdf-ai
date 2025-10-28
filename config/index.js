const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY is missing from environment variables");
  process.exit(1);
}
module.exports = {
  PORT,
  GEMINI_API_KEY,
};
