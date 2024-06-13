const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else {
    return res.status(401).json({ message: "No token, user not authorized" }); // Return the response and exit the middleware
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const authUser = await User.findById(decoded.id).select("-password");

    if (!authUser) {
      return res.status(401).json({ message: "User not found" }); // Return the response and exit the middleware
    }

    req.user = authUser;
    next(); // Call next() only if everything is successful
  } catch (error) {
    res.status(401).json({ message: "User unauthorized, token failed" });
  }
};

module.exports = {
  protect,
};
