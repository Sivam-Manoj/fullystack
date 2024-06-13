const jwt = require("jsonwebtoken");

const createToken = async (res, id, email) => {
  const payload = { id, email };
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
  res.cookie("token", token, {
    httpOnly: true,
    //sameSite: "strict",
    maxAge: 1 * 60 * 60 * 1000,
  });
};

module.exports = {
  createToken,
};
