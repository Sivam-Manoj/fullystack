const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { createToken } = require("../utils/createToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("all feilds needs to be filled");
  }
  const exUser = await User.findOne({ email });
  if (exUser) {
    res.status(401);
    throw new Error("User already exits, please login");
  }
  const user = await new User({
    name,
    email,
    password,
  });
  try {
    await user.save();
    createToken(res, user._id, user.email);
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      message: "user created succesfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
    });
    throw new Error(error);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("all feilds needs to be filled");
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("user not found");
  }
  if (user && await user.checkPassword(password)) {
    createToken(res, user._id, email);
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      message: `user ${user.name} logged in succesfully`,
    });
  } else {
    res.status(400);
    throw new Error("user credentials not valid");
  }
});

const getMe = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId).select("-password");

  if (!user) {
    res.status(404).json({ message: "User not found" });
  } else if (user._id.toString() === userId.toString()) {
    res.status(200).json(user);
  } else {
    res.status(401).json({ message: "Not authorized to access this user" });
  }
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
