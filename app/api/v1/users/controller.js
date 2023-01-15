const { StatusCodes } = require("http-status-codes");
const { createUsers, getUsers } = require("../../../services/sequelize/users");

module.exports = {
  get: async (req, res, next) => {
    try {
      const data = await getUsers();

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Successfully get users!",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  create: async (req, res, next) => {
    try {
      const data = await createUsers(req);

      res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        message: "Successfully created user!",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};
