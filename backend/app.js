require("dotenv").config();
require("express-async-errors");
// Security
const helmet = require("helmet");
const cors = require("cors");
const xssClean = require("xss-clean");
const ratingLimit = require("express-rate-limit");
// Extension
const morgan = require("morgan");
const compression = require("compression");
const cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
// Normal
const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");

const notFound = require("./src/middleware/notFound.middleware");
const errorHandlerMiddleware = require("./src/middleware/errorHandler.middleware");

// ------------ Middleware ------------
// Security
app.set("trust proxy", 1);
app.use(
  ratingLimit({
    windowMs: 15 * 60 * 100, // 15 Minute
    max: 100, // Limit each IP to 100 requests per windowMs
  })
);
app.use(cors({ credentials: true, origin: process.env.LOCAL_HOST_CLIENT }));
app.use(helmet());
app.use(xssClean());

// Extension
app.use(cookieParser());
app.use(compression());
app.use(morgan("tiny"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "haison", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

//Login API
// app.use("/api/users", userRouter)

require("./src/middleware/passportGoogleSSO.middleware");
require("./src/schedule");
require("./src/db/connectDB");
const { checkOverload } = require("./src/helpers/check-connect");
checkOverload();
app.use("/", require("./src/routes"));
app.use(errorHandlerMiddleware);
app.use("/**", notFound);
module.exports = app;
