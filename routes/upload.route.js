const express = require("express");
const router = express.Router();

const upload = require("../utils/multer");
const { uploadController } = require("../controllers");

router.post("/", upload.single("file"), uploadController);

module.exports = router;
