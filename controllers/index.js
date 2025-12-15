const fs = require("fs");
const extractTextWithPDFJS = require("../utils/pdfjs-extract.js");
const { ai, currentModel } = require("../utils/gemini.js");
const { qaPrompt, mindMapPrompt } = require("../utils/prompt.js");

const uploadController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    if (req.file.mimetype !== "application/pdf") {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: "Only PDF files are allowed" });
    }

    console.log(`📤 Processing: ${req.file.originalname}`);

    // Use pdf.js-extract for text extraction
    const extractionResult = await extractTextWithPDFJS(req.file.path);

    // Cleanup uploaded file
    fs.unlinkSync(req.file.path);

    if (!extractionResult.success) {
      return res.status(400).json({
        error: "Failed to extract text from PDF",
        details: extractionResult.error,
        suggestion: "The PDF might be corrupted, encrypted, or image-based",
      });
    }

    if (!extractionResult.text || extractionResult.text.trim().length === 0) {
      return res.status(400).json({
        error: "No text content found",
        details:
          "The PDF appears to be image-based or contains no extractable text",
        suggestion: "Please upload a PDF with selectable text content",
      });
    }

    // Provide detailed extraction info
    const textPreview =
      extractionResult.text.length > 500
        ? extractionResult.text.substring(0, 500) + "..."
        : extractionResult.text;

    res.json({
      success: true,
      text: extractionResult.text,
      pages: extractionResult.totalPages,
      wordCount: extractionResult.totalWordCount,
      extractionMethod: extractionResult.method,
      textPreview: textPreview,
      pageDetails: extractionResult.pages.map((p) => ({
        page: p.page,
        wordCount: p.wordCount,
      })),
    });
  } catch (error) {
    console.error("Upload Error:", error);
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({
      error: "Failed to process PDF",
      details: error.message,
    });
  }
};

const generateQAController = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: "No text provided" });
    }

    // Validate text content
    const wordCount = text.split(/\s+/).filter((w) => w.length > 0).length;
    if (wordCount < 20) {
      return res.status(400).json({
        error: "Insufficient text content",
        details: `Only ${wordCount} words found. Need more content for Q&A generation.`,
        suggestion: "Please upload a PDF with more text content",
      });
    }

    console.log(`🤖 Generating Q&A from ${wordCount} words...`);

    const prompt = qaPrompt(text);

    const response = await ai.models.generateContent({
      model: currentModel,
      contents: prompt,
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 1024,
        topP: 0.7,
        topK: 30,
      },
    });

    const responseText = response.text;
    console.log("📝 Raw AI response received");

    // Clean and parse JSON
    let cleanedResponse = responseText.replace(/```json|```/g, "").trim();
    let qa;

    try {
      qa = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.log("🔄 JSON parse failed, attempting extraction...");
      const jsonMatch = cleanedResponse.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        qa = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("AI response doesn't contain valid JSON format");
      }
    }

    if (!Array.isArray(qa)) {
      throw new Error("AI response is not a valid array");
    }

    // Validate and filter Q&A items
    const validQa = qa.filter(
      (item) =>
        item &&
        typeof item.question === "string" &&
        typeof item.answer === "string" &&
        item.question.trim().length > 10 && // Reasonable question length
        item.answer.trim().length > 5 // Reasonable answer length
    );

    if (validQa.length === 0) {
      throw new Error("No valid questions and answers were generated");
    }

    console.log(`✅ Generated ${validQa.length} Q&A pairs`);

    res.json({
      success: true,
      qa: validQa,
      totalGenerated: validQa.length,
      modelUsed: currentModel,
      wordCount: wordCount,
    });
  } catch (error) {
    console.error("Q&A Generation Error:", error);
    res.status(500).json({
      error: "Failed to generate Q&A",
      details: error.message,
      suggestion:
        "Please try again with a different PDF or check the text content",
    });
  }
};

const generateMindmapController = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: "No text provided" });
    }

    const wordCount = text.split(/\s+/).filter((w) => w.length > 0).length;
    if (wordCount < 20) {
      return res.status(400).json({
        error: "Insufficient text content",
        details: `Only ${wordCount} words found. Need more content for mind map generation.`,
      });
    }

    console.log(`🗺️ Generating mind map from ${wordCount} words...`);

    const prompt = mindMapPrompt(text);

    const response = await ai.models.generateContent({
      model: currentModel,
      contents: prompt,
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 1024,
        topP: 0.7,
        topK: 30,
      },
    });

    const responseText = response.text;

    let cleanedResponse = responseText.replace(/```json|```/g, "").trim();
    let mindmap;

    try {
      mindmap = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.log("🔄 JSON parse failed, attempting extraction...");
      const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        mindmap = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("AI response doesn't contain valid JSON format");
      }
    }

    // Ensure basic structure
    if (!mindmap.title) mindmap.title = "Document Overview";
    if (!Array.isArray(mindmap.children)) mindmap.children = [];

    console.log(
      `✅ Mind map generated with ${mindmap.children.length} main topics`
    );

    res.json({
      success: true,
      mindmap: mindmap,
      modelUsed: currentModel,
      wordCount: wordCount,
    });
  } catch (error) {
    console.error("Mind Map Generation Error:", error);
    res.status(500).json({
      error: "Failed to generate mind map",
      details: error.message,
    });
  }
};

module.exports = {
  uploadController,
  generateQAController,
  generateMindmapController,
};
