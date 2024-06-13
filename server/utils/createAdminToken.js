const jwt = require("jsonwebtoken");

const createAdminToken = (res, id, email, role) => {
  const payload = { id, email, role };
  const token = jwt.sign(payload, process.env.JWT_ADMIN_SECRET_KEY, {
    expiresIn: "1h",
  });
  res.cookie("adminToken", token, {
    httpOnly: true,
    maxAge: 1 * 60 * 60 * 1000,
  });
};

module.exports = {
  createAdminToken,
};
