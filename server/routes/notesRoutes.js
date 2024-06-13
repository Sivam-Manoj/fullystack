const express = require("express");
const fs = require("fs");
const path = require("path");
const { adminProtect } = require("../middlewares/adminAuthMiddleware");
const { protect } = require("../middlewares/authMiddleware");
const {
  uploadPdf,
  updatePdf,
  deletePdf,
  getPdfs,
  getPdfsAdmin,
} = require("../controllers/notesController");
const { uploadSingleFile } = require("../utils/multerStorage");

const router = express.Router();

router.get("/get-pdf", protect, getPdfs);
router.get("/get-pdf-admin", adminProtect, getPdfsAdmin);
router.post("/upload-pdf", adminProtect, uploadSingleFile, uploadPdf);
router.put("/update-pdf/:id", adminProtect, updatePdf);
router.delete("/delete-pdf/:id", adminProtect, deletePdf);

router.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
router.get("/pdf/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "..", "uploads", filename);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: "File not found" });
  }
});

module.exports = router;
