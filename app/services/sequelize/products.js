const { Product, Company } = require("../../models");
const CustomError = require("../../errors");
const sequelize = require("sequelize");
const { Op } = require("sequelize");

module.exports = {
  createProduct: async (req) => {
    const { id: companyId } = req.params;
    const { name = [] } = req.body;

    if (!name || name.length < 1)
      throw new CustomError.BadRequest("Please input name!");

    const checkCompany = await Company.findOne({
      where: {
        id: companyId,
      },
    });

    if (!checkCompany) throw new CustomError.NotFound("Company not found!");

    const checkStatusCompany = await Company.findOne({
      where: {
        id: companyId,
        isRegistered: "Sudah",
      },
    });

    if (!checkStatusCompany)
      throw new CustomError.NotFound("Company not registered!");

    const payload = [];
    name.length > 0 &&
      name.map((value) =>
        payload.push({
          name: value,
          companyId,
        })
      );

    if (payload.length < 1) throw new CustomError.BadRequest("Payload empty!");

    await Product.destroy({
      where: {
        companyId,
      },
    });

    const data = await Product.bulkCreate(payload);

    return data;
  },
  getProducts: async (req) => {
    const { id: companyId } = req.params;
    const { page = 1, limit = 25 } = req.query;

    const parsePage = parseInt(page);
    const parseLimit = parseInt(limit);

    let condition = {
      offset: parseLimit * (parsePage - 1),
      limit: parseLimit,
      where: {
        companyId,
      },
      include: [
        {
          model: Company,
        },
      ],
    };

    const data = await Product.findAll(condition);
    const count = await Product.count(condition);

    const payload = {
      currentPage: parsePage,
      totalPage: Math.ceil(count / parseLimit),
      totalData: count,
      data,
    };

    return payload;
  },
  destroyProduct: async (req) => {
    const { companyId, productId } = req.params;

    const checkCompany = await Company.findOne({
      where: {
        id: companyId,
      },
    });

    if (!checkCompany) throw new CustomError.NotFound("Company not found!");

    const data = await Product.findOne({
      where: {
        id: productId,
      },
    });

    if (!data) throw new CustomError.NotFound("Product not found!");

    await data.destroy();

    return data;
  },
};
