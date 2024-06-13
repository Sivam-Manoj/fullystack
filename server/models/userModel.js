const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

UserSchema.methods.checkPassword = async function (givenPassword) {
  return await bcryptjs.compare(givenPassword, this.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
