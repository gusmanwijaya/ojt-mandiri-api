const { Company } = require("../../models");

module.exports = {
  dashboard: async (req) => {
    const registered = await Company.count({
      where: {
        isRegistered: "Sudah",
      },
    });

    const notRegistered = await Company.count({
      where: {
        isRegistered: "Belum",
      },
    });

    const data = {
      registered,
      notRegistered,
    };

    return data;
  },
};
