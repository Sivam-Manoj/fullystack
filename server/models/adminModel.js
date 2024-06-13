const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value.length >= 8;
      },
      message: "Password must be 8 digits or more",
    },
  },
  role: {
    type: String,
    required: true,
  },
});

AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

AdminSchema.methods.checkPassword = async function (givenpassword) {
  return await bcryptjs.compare(givenpassword, this.password);
};

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
