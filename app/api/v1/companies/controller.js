const { StatusCodes } = require("http-status-codes");
const {
  createCompany,
  getCompanies,
  detailCompany,
  destroyCompany,
  editCompany,
  importCompanies,
  truncateCompanies,
} = require("../../../services/sequelize/companies");
const { getOutscraper } = require("../../../services/outscraper");
const { rootPath } = require("../../../configs/config");
const fs = require("fs");

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
      const response = await getCompanies(req);

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Successfully get companies!",
        currentPage: response.currentPage,
        totalPage: response.totalPage,
        totalData: response.totalData,
        data: response.data,
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
  importCompanies: async (req, res, next) => {
    try {
      const data = await importCompanies(req);

      res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        message: "Successfully imported companies!",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  getOutscraper: async (req, res, next) => {
    try {
      const data = await getOutscraper(req);

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Successfully get data companies from outscraper!",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  downloadTemplateImport: async (req, res, next) => {
    try {
      const fileName = "Template-Import.xlsx";
      const anyCurrentPath = `${rootPath}/public/data/${fileName}`;

      if (!fs.existsSync(anyCurrentPath))
        throw new CustomError.NotFound("Template not found!");

      res.download(anyCurrentPath);
    } catch (error) {
      next(error);
    }
  },
  truncateCompanies: async (req, res, next) => {
    try {
      const data = await truncateCompanies(req);

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Successfully truncate table companies!",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};
