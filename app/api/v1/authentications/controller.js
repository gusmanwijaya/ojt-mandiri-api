const { StatusCodes } = require("http-status-codes");
const { signIn } = require("../../../services/sequelize/authentications");

module.exports = {
  signIn: async (req, res, next) => {
    try {
      const data = await signIn(req);

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Successfully sign in!",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};
