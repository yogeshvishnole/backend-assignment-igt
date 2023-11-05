const mongoose = require("mongoose");

//Creating Schema using mongoose
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: [4, "Title should be minimum of 4 characters"],
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  students_watched: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: [1, "rating should be greater than or equal to 1"],
    max: [5, "rating should be less than or equal to 5"],
  },
  reviews_count: {
    type: Number,
    required: true,
  },
});

//Creating models
const courseModel = mongoose.model("course", courseSchema);
module.exports = courseModel;
