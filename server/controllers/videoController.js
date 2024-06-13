const asyncHandler = require("express-async-handler");
const Video = require("../models/videoModel");

// Add a new video
const addVideo = asyncHandler(async (req, res) => {
  const { title, link, tags } = req.body;
  const adminId = req.admin._id;
  console.log(title, link, tags);

  if (!title || !link || !tags) {
    res.status(400);
    throw new Error("All fields need to be filled");
  }

  if (!adminId) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const video = new Video({
    user: adminId,
    title,
    link,
    tags,
  });

  try {
    await video.save();
    res.status(201).json(video);
  } catch (error) {
    res.status(500);
    throw new Error(`Error while adding video: ${error.message}`);
  }
});

// Update an existing video
const updateVideo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, tags } = req.body;
  const adminId = req.admin._id;
  console.log(id, title, tags, adminId);
  if (!id) {
    res.status(400);
    throw new Error("ID not found");
  }

  if (!title || !tags) {
    res.status(400);
    throw new Error("Please fill required fields");
  }

  const exVideo = await Video.findById(id);

  if (!exVideo) {
    res.status(404);
    throw new Error("Video not found");
  }

  if (exVideo.user.toString() !== adminId.toString()) {
    res.status(401);
    throw new Error("User not authorized for this operation");
  }

  try {
    await Video.findByIdAndUpdate(id, { title, tags }, { new: true });
    res.status(200).json({ message: "update succesfull" });
  } catch (error) {
    res.status(500);
    throw new Error(`Error while updating video: ${error.message}`);
  }
});

// Delete a video
const deleteVideo = asyncHandler(async (req, res) => {
  const videoId = req.params.id;
  const adminId = req.admin._id;

  if (!videoId) {
    res.status(400);
    throw new Error("ID not found");
  }

  const exVideo = await Video.findById(videoId);

  if (!exVideo) {
    res.status(404);
    throw new Error("Video not found");
  }

  if (exVideo.user.toString() !== adminId.toString()) {
    res.status(401);
    throw new Error("User not authorized for this operation");
  }

  try {
    await Video.findByIdAndDelete(exVideo._id);
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    res.status(500);
    throw new Error(`Error while deleting video: ${error.message}`);
  }
});

// Get videos for a user
const getVideo = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    res.status(401);
    throw new Error("User not authorized");
  }

  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500);
    throw new Error(`Error while getting videos: ${error.message}`);
  }
});

// Get videos for an admin
const getAdminVideo = asyncHandler(async (req, res) => {
  const adminId = req.admin._id;

  if (!adminId) {
    res.status(401);
    throw new Error("User not authorized");
  }

  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500);
    throw new Error(`Error while getting videos: ${error.message}`);
  }
});

module.exports = {
  addVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  getAdminVideo,
};
