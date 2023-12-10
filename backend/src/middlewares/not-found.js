const { NotFoundException } = require('../utils/customErrors');

// eslint-disable-next-line no-unused-vars
const notFound = (req, res, _next) => {
  throw new NotFoundException();
};

module.exports = {
  notFound
};