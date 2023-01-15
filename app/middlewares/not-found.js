const { StatusCodes } = require("http-status-codes");

const notFound = (req, res) => {
  return res.status(StatusCodes.NOT_FOUND).json({
    statusCode: StatusCodes.NOT_FOUND,
    message: "Route does not exist!",
  });
};

module.exports = notFound;
