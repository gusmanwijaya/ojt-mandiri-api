require("dotenv").config();
const { Company } = require("../../models");
const CustomError = require("../../errors");
const { Op } = require("sequelize");
const Outscraper = require("outscraper");
const { SECRET_API_KEY_OUTSCRAPER } = process.env;

let client = new Outscraper(SECRET_API_KEY_OUTSCRAPER);

module.exports = {
  getOutscraper: async (req) => {
    const { q, max } = req.query;

    if (!q || q === "")
      throw new CustomError.BadRequest("Please input query params q!");

    const response = await client.googleMapsSearch(
      [`${q} 11140 jakarta indonesia`],
      (limit = max || 25),
      (language = "id"),
      (region = "id")
    );

    const payload = [];
    for (let index = 0; index < response[0].length; index++) {
      const element = response[0][index];

      let checkDuplicate = await Company.count({
        where: {
          name: element.name,
        },
      });

      if (checkDuplicate < 1) {
        payload.push({
          type: element.type || "-",
          name: element.name || "-",
          email: element.email || "-",
          website: element.site || "-",
          address: element.full_address || "-",
          telephone: element.phone || "-",
          location: element.location_link || "-",
          additionalInfo: element.description || "-",
        });
      }
    }

    if (payload.length < 1)
      throw new CustomError.BadRequest("Data not available!");

    const data = await Company.bulkCreate(payload);

    return data;
  },
};
