const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel");
const { createAdminToken } = require("../utils/createAdminToken");

const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password, code } = req.body;
  if (!name || !email || !password || !code) {
    res.status(400);
    throw new Error("All fields need to be filled");
  }
  const exUser = await Admin.findOne({ email });
  if (exUser) {
    res.status(401);
    throw new Error("User already exists, please login");
  }

  let role = "user";
  let admin;

  if (code === process.env.FULLY_STACK_ADMIN_CODE) {
    role = "admin";
    admin = new Admin({
      name,
      email,
      password,
      role,
    });
  } else {
    res.status(400);
    throw new Error("Invalid code, unable to create admin account");
  }

  try {
    await admin.save();
    createAdminToken(res, admin._id, admin.email, admin.role);
    res.status(201).json({
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      message: "Admin created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields need to be filled");
  }
  const admin = await Admin.findOne({ email });
  if (!admin) {
    res.status(400);
    throw new Error("User not found");
  }
  if ((await admin.checkPassword(password)) && admin.role === "admin") {
    createAdminToken(res, admin._id, admin.email, admin.role);
    res.status(200).json({
      id: admin._id,
      name: admin.name,
      email: admin.email,
      message: `Admin ${admin.name} logged in successfully`,
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

const getAdmin = asyncHandler(async (req, res) => {
  const adminId = req.admin._id;

  const admin = await Admin.findById(adminId).select("-password");

  if (!admin) {
    res.status(404).json({ message: "Admin not found" });
  } else {
    res.status(200).json(admin);
  }
});

module.exports = {
  registerAdmin,
  loginAdmin,
  getAdmin,
};
