const userModel = require("../services/database/models/user.model");
const { Jwt } = require("../services/jwt");
const { AppError } = require("../utils/app-error");

const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new AppError("Please login to access the data");
    }
    const verify = await Jwt.verify(token);
    req.user = await userModel.findById(verify.id);
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = isAuthenticated;
