const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = function (err, req, res, next) {
  // Custom error
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Some thing went wrong, please try again",
    reasonStatusCode: err.reasonStatusCode || "Error",
  };
  // if (err instanceof CustomErrorApi) return res.status(err.statusCode).json({ message: err.message });

  // // Duplicate Erro
  // if (err.code || err.code === 11000) {
  //   customError.message = `Duplicate item, Please try again`;
  //   customError.statusCode = StatusCodes.BAD_REQUEST;
  // }

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

  return res.status(customError.statusCode).json({
    status: customError.statusCode,
    error: customError.reasonStatusCode,
    message: customError.message,
  });
};

module.exports = errorHandlerMiddleware;
