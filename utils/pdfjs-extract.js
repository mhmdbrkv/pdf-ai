// ✅ Import pdf.js-extract
const { PDFExtract } = require("pdf.js-extract");

async function extractTextWithPDFJS(filePath) {
  try {
    console.log("🔍 Extracting text with pdf.js-extract...");

    const pdfExtract = new PDFExtract();

    const options = {
      firstPage: 1, // Start from page 1
      lastPage: undefined, // Extract all pages
      password: undefined, // No password
      verbosity: -1, // No verbose logging
      normalizeWhitespace: false, // Keep original whitespace
      disableCombineTextItems: false, // Combine text items for better results
    };

    const data = await pdfExtract.extract(filePath, options);

    console.log(`📄 PDF extracted: ${data.pages.length} pages found`);

    // Extract text from all pages
    let fullText = "";
    let pageTexts = [];

    data.pages.forEach((page, pageIndex) => {
      let pageText = `--- Page ${pageIndex + 1} ---\n`;
      let pageContent = "";

      // Sort content by y-position (top to bottom) and then x-position (left to right)
      const sortedContent = page.content.sort((a, b) => {
        if (a.y !== b.y) return a.y - b.y;
        return a.x - b.x;
      });

      sortedContent.forEach((item) => {
        if (item.str && item.str.trim().length > 0) {
          pageContent += item.str + " ";
        }
      });

      pageText += pageContent.trim() + "\n\n";
      fullText += pageText;
      pageTexts.push({
        page: pageIndex + 1,
        content: pageContent.trim(),
        wordCount: pageContent
          .trim()
          .split(/\s+/)
          .filter((w) => w.length > 0).length,
      });
    });

    const totalWordCount = pageTexts.reduce(
      (sum, page) => sum + page.wordCount,
      0
    );

    console.log(`✅ Extraction successful: ${totalWordCount} words extracted`);

    return {
      success: true,
      text: fullText.trim(),
      pages: pageTexts,
      totalPages: data.pages.length,
      totalWordCount: totalWordCount,
      method: "pdf.js-extract",
    };
  } catch (error) {
    console.error("❌ PDF extraction failed:", error.message);
    return {
      success: false,
      text: "",
      error: error.message,
      method: "pdf.js-extract",
    };
  }
}

module.exports = extractTextWithPDFJS;
