const { JsonWebTokenError } = require('jsonwebtoken');
const { HTTP_STATUS } = require('../utils/http');
const { CustomError } = require('../utils/customErrors');

const errorHandler = (err, req, res, next) => {
  if (err instanceof JsonWebTokenError) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      status: HTTP_STATUS.BAD_REQUEST,
      message: err.message
    });
  }

  if (err instanceof CustomError) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message
    });
  }

  next(err);
};

module.exports = { errorHandler };