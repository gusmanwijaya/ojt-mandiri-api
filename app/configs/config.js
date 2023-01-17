require("dotenv").config();
const path = require("path");

const { JWT_SECRET_KEY } = process.env;

module.exports = {
  rootPath: path.resolve(__dirname, "../../"),
  JWT_SECRET_KEY,
};
