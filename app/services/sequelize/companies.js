const { Company } = require("../../models");
const CustomError = require("../../errors");
const { Op } = require("sequelize");

module.exports = {
  createCompany: async (req) => {
    const {
      type,
      name,
      email,
      website,
      address,
      telephone,
      location,
      isRegistered,
      additionalInfo,
    } = req.body;

    if (!type) throw new CustomError.BadRequest("Please input type!");
    if (!name) throw new CustomError.BadRequest("Please input name!");
    if (!address) throw new CustomError.BadRequest("Please input address!");

    if (email) {
      const emailFormat =
        /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      if (!email.match(emailFormat))
        throw new CustomError.BadRequest("Please input a valid email address!");
    }

    const data = await Company.create({
      type,
      name,
      email,
      website,
      address,
      telephone,
      location,
      isRegistered,
      additionalInfo,
    });

    return data;
  },
  getCompanies: async (req) => {
    const { page = 1, limit = 25, type, name } = req.query;
    const parsePage = parseInt(page);
    const parseLimit = parseInt(limit);

    let condition = {
      offset: parseLimit * (parsePage - 1),
      limit: parseLimit,
    };

    if (type || name) {
      condition = {
        ...condition,
        where: {
          [Op.or]: [
            {
              type: {
                [Op.substring]: type,
              },
            },
            {
              name: {
                [Op.substring]: name,
              },
            },
          ],
        },
      };
    }

    const data = await Company.findAll(condition);

    const count = await Company.count(condition);

    const payload = {
      current_page: parsePage,
      total_page: Math.ceil(count / parseLimit),
      total_data: count,
      data,
    };

    return payload;
  },
  detailCompany: async (req) => {
    const { id: companyId } = req.params;

    if (!companyId)
      throw new CustomError.BadRequest("Please input query params!");

    const data = await Company.findOne({
      where: {
        id: companyId,
      },
    });

    if (!data) throw new CustomError.NotFound("Company not found!");

    return data;
  },
  destroyCompany: async (req) => {
    const { id: companyId } = req.params;

    if (!companyId)
      throw new CustomError.BadRequest("Please input query params!");

    const data = await Company.findOne({
      where: {
        id: companyId,
      },
    });

    if (!data) throw new CustomError.NotFound("Company not found!");

    await data.destroy();

    return data;
  },
  editCompany: async (req) => {
    const { id: companyId } = req.params;
    const {
      type,
      name,
      email,
      website,
      address,
      telephone,
      location,
      isRegistered,
      additionalInfo,
    } = req.body;

    if (!companyId)
      throw new CustomError.BadRequest("Please input query params!");

    const data = await Company.findOne({
      where: {
        id: companyId,
      },
    });

    if (!data) throw new CustomError.NotFound("Company not found!");

    if (!type) throw new CustomError.BadRequest("Please input type!");
    if (!name) throw new CustomError.BadRequest("Please input name!");
    if (!address) throw new CustomError.BadRequest("Please input address!");

    if (email) {
      const emailFormat =
        /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      if (!email.match(emailFormat))
        throw new CustomError.BadRequest("Please input a valid email address!");
    }

    data.type = type;
    data.name = name;
    data.email = email;
    data.website = website;
    data.address = address;
    data.telephone = telephone;
    data.location = location;
    data.isRegistered = isRegistered;
    data.additionalInfo = additionalInfo;

    await data.save();

    return data;
  },
};
