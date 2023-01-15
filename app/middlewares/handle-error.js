const { StatusCodes } = require("http-status-codes");

const handleError = (error, req, res, next) => {
  let customError = {
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: error.message || null,
    name: error.name || null,
    errors: error.errors || null,
  };

  // START: Sequelize
  if (
    error.name === "SequelizeValidationError" ||
    error.name === "SequelizeUniqueConstraintError"
  ) {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.message = Object.values(error.errors)
      .map((value) => value.message)
      .join(", ");
  }

  if (
    error.name === "TypeError" ||
    error.name === "ReferenceError" ||
    error.name === "SequelizeDatabaseError"
  ) {
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  // END: Sequelize

  // START: JWT
  if (error.name === "TokenExpiredError") {
    customError.statusCode = StatusCodes.UNAUTHORIZED;
  }
  // END: JWT

  return res.status(customError.statusCode).json({
    statusCode: customError.statusCode,
    message: customError.message,
    name: customError.name,
    errors: customError.errors,
  });
};

module.exports = handleError;
