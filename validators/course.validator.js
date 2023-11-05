const { check } = require("express-validator");

exports.createCourseValidator = [
  check("title")
    .exists({ checkNull: true })
    .withMessage("title is required field")
    .isLength({ min: 4 })
    .withMessage("title must be greater than or equal to 4"),
  check("image")
    .exists({ checkNull: true })
    .withMessage("image is required field"),
  check("students_watched")
    .exists({ checkNull: true })
    .withMessage("students_watched is required field")
    .isInt({ min: 1 })
    .withMessage(
      "students_watched must be a integer and greater than or equal to 1"
    ),
  check("rating")
    .exists({ checkNull: true })
    .withMessage("rating is required field")
    .isInt({ min: 1, max: 5 })
    .withMessage(
      "rating must be greater than or equal to 1 and less than or equal to 5"
    ),
  check("reviews_count")
    .exists({ checkNull: true })
    .withMessage("reviews_count is required field")
    .isInt({ min: 1 })
    .withMessage("reviews_count must be greater than or equal to 1"),
];

exports.updateCourseValidator = [
  check("title")
    .optional()
    .isLength({ min: 4 })
    .withMessage("title must be greater than or equal to 4"),
  check("image").optional(),
  check("students_watched")
    .optional()
    .isInt({ min: 1 })
    .withMessage(
      "students_watched must be a integer and greater than or equal to 1"
    ),
  check("rating")
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage(
      "rating must be greater than or equal to 1 and less than or equal to 5"
    ),
  check("reviews_count")
    .optional()
    .isInt({ min: 1 })
    .withMessage("reviews_count must be greater than or equal to 1"),
];
