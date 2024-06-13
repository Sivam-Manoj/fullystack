const asyncHandler = require("express-async-handler");
const Notes = require("../models/notesModel");
const fs = require("fs");
const path = require("path");

const uploadPdf = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const { file } = req;
  const adminId = req.admin._id;
  console.log(title, file);
  if (!req.file || !req.file.filename) {
    return res.status(400).json({ message: "No files found" });
  }

  const fileName = req.file.filename;
  const filePath = path.join(__dirname, "..", "uploads", fileName);

  try {
    const file = new Notes({
      user: adminId,
      title: title,
      filename: fileName,
      path: filePath,
    });
    await file.save();
    res.status(201).json({ message: "File uploaded successfully" });
  } catch (error) {
    console.error("Error saving the file:", error);
    res
      .status(500)
      .json({ message: "Error saving the file", error: error.message });
  }
});

// Update the title of an existing PDF
const updatePdf = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Please fill all the credentials" });
  }

  try {
    const notes = await Notes.findByIdAndUpdate(id, { title }, { new: true });

    if (!notes) {
      return res.status(404).json({ message: "Notes PDF not found" });
    }

    res.status(200).json(notes);
  } catch (error) {
    console.error("Error updating the PDF:", error);
    res
      .status(500)
      .json({ message: `Error while updating PDF: ${error.message}` });
  }
});

// Delete a PDF
const deletePdf = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const exNotes = await Notes.findById(id);

    if (!exNotes) {
      return res.status(404).json({ message: "PDF not found" });
    }

    await Notes.findByIdAndDelete(exNotes._id);

    const filePath = path.join(__dirname, "..", "uploads", exNotes.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    } else {
      console.log("File not found:", filePath);
    }

    res.status(200).json({ message: "Notes PDF deleted successfully" });
  } catch (error) {
    console.error("Error deleting the PDF:", error);
    res
      .status(500)
      .json({ message: `Error while deleting PDF: ${error.message}` });
  }
});

// Get all PDFs for a user
const getPdfs = asyncHandler(async (req, res) => {
  const id = req.user._id;

  if (!id) {
    return res.status(401).json({ message: "User not authorized" });
  }

  try {
    const notes = await Notes.find();
    res.status(200).json(notes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// Get all PDFs for an admin
const getPdfsAdmin = asyncHandler(async (req, res) => {
  const id = req.admin._id;

  if (!id) {
    return res.status(401).json({ message: "User not authorized" });
  }

  try {
    const notes = await Notes.find();
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error retrieving PDFs:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports = {
  uploadPdf,
  updatePdf,
  deletePdf,
  getPdfs,
  getPdfsAdmin,
};
