const { validationResult } = require("express-validator");
const { AppError } = require("../utils/app-error");

exports.validate = (validationMiddleware) => {
  let validateFunction = (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new AppError(errors.array()[0].msg, 400);
      }
      return next();
    } catch (err) {
      return next(err);
    }
  };

  return [validationMiddleware, validateFunction];
};
