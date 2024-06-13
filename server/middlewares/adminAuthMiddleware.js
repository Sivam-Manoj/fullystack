const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");

const adminProtect = async (req, res, next) => {
  let adminToken;
  if (req.cookies && req.cookies.adminToken) {
    token = req.cookies.adminToken;
  } else {
    return res.status(401).json({ message: "no token, authorization failed" });
  }

  try {
    const decodedAdmin = jwt.verify(
      token,
      process.env.JWT_ADMIN_SECRET_KEY
    );
    const authAdmin = await Admin.findById(decodedAdmin.id).select("-password");
    if (!authAdmin) {
      return res
        .status(401)
        .json({ message: "admin not found, authorization failed" });
    }
    if (authAdmin.role !== "admin") {
      return res.status(400).json({
        message: "user not admin ,authorization failed",
      });
    }
    req.admin = authAdmin;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: `token not valid, authorization failed: ${error}` });
  }
};

module.exports = {
  adminProtect,
};
