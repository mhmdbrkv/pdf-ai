const express = require("express");
const router = express.Router();

const {
  generateQAController,
  generateMindmapController,
} = require("../controllers");

router.post("/generate-qa", generateQAController);
router.post("/generate-mindmap", generateMindmapController);

module.exports = router;
