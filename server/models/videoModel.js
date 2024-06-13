const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VideoSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
      unique: true,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Video = mongoose.model("Video", VideoSchema);
module.exports = Video;
