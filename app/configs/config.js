require("dotenv").config();

const { JWT_SECRET_KEY } = process.env;

module.exports = {
  JWT_SECRET_KEY,
};
