const CustomError = require("../errors");
const { isJWTValid } = require("../utils/jwt");

module.exports = {
  authenticationUser: async (req, res, next) => {
    try {
      let token;

      const headersAuthorization = req.headers.authorization;

      if (headersAuthorization && headersAuthorization.startsWith("Bearer")) {
        token = headersAuthorization.split(" ")[1];
      }

      if (!token) throw new CustomError.Unauthorized("Authentication invalid!");

      const payload = isJWTValid(token);

      req.user = {
        id: payload.id,
        name: payload.name,
        username: payload.username,
      };

      next();
    } catch (error) {
      next(error);
    }
  },
  authorizeRoles:
    (...roles) =>
    (req, res, next) => {
      if (!roles.includes(req.user.role))
        throw new CustomError.Forbidden("Access denied to this route!");
      next();
    },
};
