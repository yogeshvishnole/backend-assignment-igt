//Requiring all the necessary files and libraries
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { catchAsync } = require("../../utils/catch-async");
const { AppError } = require("../../utils/app-error");
const userModel = require("../../services/database/models/user.model");

//Creating express router
const route = express.Router();

//Creating register route
route.post(
  "/register",
  catchAsync(async (req, res, next) => {
    const { name, email, password } = req.body;
    //Check emptyness of the incoming data
    if (!name || !email || !password) {
      throw new AppError("Please enter all the details");
    }

    //Check if the user already exist or not
    const userExist = await userModel.findOne({ email: req.body.email });
    if (userExist) {
      throw new AppError("User already exist with the given emailId");
    }
    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashPassword;
    const user = new userModel(req.body);
    await user.save();
    const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    return res.cookie("token", token).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  })
);
//Creating login routes
route.post(
  "/login",
  catchAsync(async (req, res) => {
    const { email, password } = req.body;
    //Check emptyness of the incoming data
    if (!email || !password) {
      throw new AppError("Please enter all the details");
    }
    //Check if the user already exist or not
    const userExist = await userModel.findOne({ email: req.body.email });
    if (!userExist) {
      return res.json({ message: "Wrong credentials" });
    }
    //Check password match
    const isPasswordMatched = await bcrypt.compare(
      password,
      userExist.password
    );
    if (!isPasswordMatched) {
      return res.json({ message: "Wrong credentials pass" });
    }
    const token = await jwt.sign(
      { id: userExist._id },
      process.env.SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );
    return res
      .cookie("token", token)
      .json({ success: true, message: "LoggedIn Successfully" });
  })
);

//Creating user routes to fetch users data
route.get(
  "/",
  catchAsync(async (req, res, next) => {
    const user = await userModel.find();
    if (!user) {
      throw new AppError("No user found");
    }
    return res.json({ success: true, data: user });
  })
);

module.exports = route;
