const AppError = require("../errors/custom-error");

const handleCastErrorDB = (err) => {
  const message = `Inavlid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFields = (err) => {
  // const value = err.message.match(/(["'])(\\?.)*?\1/);
  // console.log(value);
  const value = err.keyValue.name;
  const message = `Duplicate field value: "${value}", Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data: ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const sendErrorProd = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    console.log("ERROR 💥");
    return res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
  console.log(err);
  if (err.isOperational) {
    return res.status(err.statusCode).render("error", {
      title: "Some thing went wrong",
      msg: err.message,
    });
  }
  console.log("ERROR 💥");
  return res.status(err.statusCode).render("error", {
    title: "Some thing went wrong",
    msg: "Please try again later",
  });
};

module.exports = (err, req, res, next) => {
  console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  let error = err;

  if (err.name === "CastError") {
    console.log("handled");
    error = handleCastErrorDB(error);
  }

  if (error.code === 11000) error = handleDuplicateFields(error);
  if (err.name === "ValidationError") error = handleValidationError(error);
  if (err.name === "TokenExpiredError") error = handleTokenExpiredError(error);
  console.log(error);
  sendErrorProd(error, req, res);
};
