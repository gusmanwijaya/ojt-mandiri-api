const { User } = require("../../models");
const CustomError = require("../../errors");
const { createTokenUser } = require("../../utils/createTokenJwt");
const { createJWT } = require("../../utils/jwt");
const bcrypt = require("bcryptjs");

module.exports = {
  signIn: async (req) => {
    const { username, password } = req.body;

    if (!username || !password)
      throw new CustomError.BadRequest("Please input username and password!");

    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (!user) throw new CustomError.Unauthorized("Invalid credentials!");

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect)
      throw new CustomError.Unauthorized("Invalid credentials!");

    const token = createJWT(createTokenUser(user));

    return {
      name: user.name,
      username: user.username,
      token,
    };
  },
};
