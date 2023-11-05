//Requiring all the necessary files and libraries
const express = require("express");
const { catchAsync } = require("../../utils/catch-async");
const { AppError } = require("../../utils/app-error");
const courseModel = require("../../services/database/models/course.model");
const {
  createCourseValidator,
  updateCourseValidator,
} = require("../../validators/course.validator");
const { validate } = require("../../middlewares/validation.middleware");
const isAuthenticated = require("../../middlewares/authentication.middleware");

//Creating express router
const route = express.Router();

route.post(
  "/",
  isAuthenticated,
  ...validate(createCourseValidator),
  catchAsync(async (req, res, next) => {
    const courseExist = await courseModel.findOne({ title: req.body.title });
    if (courseExist) {
      throw new AppError("Course already exist with the given title");
    }
    let course = new courseModel(req.body);
    course = await course.save();
    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: course,
    });
  })
);

route.get(
  "/",
  catchAsync(async (req, res, next) => {
    const course = await courseModel.find();
    if (!course) {
      throw new AppError("No course found");
    }
    return res.json({ success: true, data: course });
  })
);

route.delete(
  "/:id",
  isAuthenticated,
  catchAsync(async (req, res, next) => {
    const course = await courseModel.findByIdAndDelete(req.params.id);

    if (!course) {
      throw new AppError("can not found course with given courseId", 404);
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  })
);

route.patch(
  "/:id",
  isAuthenticated,
  ...validate(updateCourseValidator),
  catchAsync(async (req, res, next) => {
    const course = await courseModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!course) {
      return next(
        new AppError("can not found course with given courseId", 404)
      );
    }

    res.status(200).json({
      status: "success",
      data: {
        data: course,
      },
    });
  })
);

module.exports = route;
