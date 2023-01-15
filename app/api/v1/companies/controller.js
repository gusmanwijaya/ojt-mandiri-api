const { StatusCodes } = require("http-status-codes");
const {
  createCompany,
  getCompanies,
  detailCompany,
  destroyCompany,
  editCompany,
} = require("../../../services/sequelize/companies");

module.exports = {
  createCompany: async (req, res, next) => {
    try {
      const data = await createCompany(req);

      res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        message: "Successfully created company!",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  getCompanies: async (req, res, next) => {
    try {
      const data = await getCompanies(req);

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Successfully get companies!",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  detailCompany: async (req, res, next) => {
    try {
      const data = await detailCompany(req);

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Successfully get detail company!",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  destroyCompany: async (req, res, next) => {
    try {
      const data = await destroyCompany(req);

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Successfully deleted company!",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  editCompany: async (req, res, next) => {
    try {
      const data = await editCompany(req);

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Successfully updated company!",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};
