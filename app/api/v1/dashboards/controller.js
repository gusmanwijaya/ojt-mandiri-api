const { StatusCodes } = require("http-status-codes");
const { dashboard } = require("../../../services/sequelize/dashboards");

module.exports = {
  dashboard: async (req, res, next) => {
    try {
      const data = await dashboard(req);

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Successfully get dashboard's data!",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};
