const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

//Configure dotenv
dotenv.config({ path: "./config/config.env" });
require("./config/db-connection");

//Creating an app from express
const app = express();

const userRoutes = require("./routes/v1/user.route");
const courseRoutes = require("./routes/v1/course.route");
const errorMiddleware = require("./middlewares/error.middleware");

//Using express.json to get request of json data
app.use(express.json({limit:"1gb"}));

//Configuring cookie-parser
app.use(cookieParser());

//Using routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/course", courseRoutes);

// registering global error handler
app.use(errorMiddleware);

//listening to the server
app.listen(process.env.PORT, () => {
  console.log(`Server is listening at ${process.env.PORT}`);
});
