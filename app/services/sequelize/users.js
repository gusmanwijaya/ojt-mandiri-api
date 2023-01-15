const { User } = require("../../models");
const CustomError = require("../../errors");
const bcrypt = require("bcryptjs");

module.exports = {
  getUsers: async () => {
    const data = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
    return data;
  },
  createUsers: async (req) => {
    const { name, username, password, confirmPassword } = req.body;

    if (!name) throw new CustomError.BadRequest("Please input name!");
    if (!username)
      throw new CustomError.BadRequest("Please input an username!");
    if (!password) throw new CustomError.BadRequest("Please input password!");
    if (!confirmPassword)
      throw new CustomError.BadRequest("Please input confirm password");

    if (password !== confirmPassword)
      throw new CustomError.BadRequest(
        "Password and confirmation password doesn't match!"
      );

    const hashPassword = bcrypt.hashSync(password, 12);

    const data = await User.create({
      name,
      username,
      password: hashPassword,
    });

    delete data.dataValues.password;

    return data;
  },
};
