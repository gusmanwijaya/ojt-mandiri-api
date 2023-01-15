const {
  getProducts,
  createProduct,
  destroyProduct,
} = require("../../../services/sequelize/products");
const { StatusCodes } = require("http-status-codes");

module.exports = {
  createProduct: async (req, res, next) => {
    try {
      const data = await createProduct(req);

      res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        message: "Successfully created company's product!",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  getProducts: async (req, res, next) => {
    try {
      const response = await getProducts(req);

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Successfully get company's product!",
        currentPage: response.currentPage,
        totalPage: response.totalPage,
        totalData: response.totalData,
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  },
  destroyProduct: async (req, res, next) => {
    try {
      const data = await destroyProduct(req);

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Successfully deleted company's product!",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};
