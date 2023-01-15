const JWT = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../configs/config");

module.exports = {
  createJWT: (payload) => JWT.sign(payload, JWT_SECRET_KEY),
  isJWTValid: (token) => JWT.verify(token, JWT_SECRET_KEY),
};
