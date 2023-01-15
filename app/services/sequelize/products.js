const { Product, Company } = require("../../models");
const CustomError = require("../../errors");
const { Op } = require("sequelize");

module.exports = {
  createProduct: async (req) => {
    const { id: companyId } = req.params;
    const { name } = req.body;

    if (!name) throw new CustomError.BadRequest("Please input name!");

    const checkCompany = await Company.findOne({
      where: {
        id: companyId,
      },
    });

    if (!checkCompany) throw new CustomError.NotFound("Company not found!");

    const data = await Product.create({
      name,
      companyId,
    });

    return data;
  },
  getProducts: async (req) => {
    const { id: companyId } = req.params;
    const { page = 1, limit = 25, name } = req.query;

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

    if (name) {
      condition = {
        ...condition,
        where: {
          ...condition.where,
          name: {
            [Op.substring]: name,
          },
        },
      };
    }

    const data = await Product.findAll(condition);
    const count = await Product.count(condition);

    const payload = {
      current_page: parsePage,
      total_page: Math.ceil(count / parseLimit),
      total_data: count,
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
