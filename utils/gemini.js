const { GoogleGenAI } = require("@google/genai");
const { GEMINI_API_KEY } = require("../config");

// Initialize GoogleGenAI
const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});
let currentModel = "gemini-2.5-flash";

module.exports = { ai, currentModel };
