const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotesSchema = new Schema(
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
    filename: {
      type: String,
      required: true,
      unique: true,
    },
    path: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Notes = mongoose.model("Notes", NotesSchema);
module.exports = Notes;
