const { StatusCodes } = require("http-status-codes");
const logging = require("../helpers/logging");

const errorHandlerMiddleware = function (err, req, res, next) {
  // Custom error
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Some thing went wrong, please try again",
    reasonStatusCode: err.reasonStatusCode || "Error",
  };

  // // Duplicate Error
  if (err.code || err.code === 11000) {
    console.log("err::::", err);
    customError.message = `Duplicate item, Please try again`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // Enter miss name, email, password
  if (err.name === "ValidationError") {
    customError.message = err.errors;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // Enter excess or missing id when we wanna getting one object
  if (err.name === "CastError") {
    customError.message = `No item found with id :${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  // Print logs errors
  let userInfo;
  if (req.user) userInfo = req.user;
  logging({
    message: customError.message,
    method: req.method,
    url: req.url,
    ...userInfo,
  });

  return res.status(customError.statusCode).json({
    status: customError.statusCode,
    error: customError.reasonStatusCode,
    message: customError.message,
  });
};

module.exports = errorHandlerMiddleware;
