// eslint-disable-next-line no-unused-vars
const notFound = (req, res, _next) =>{
  res.status(404).json({
    statusCode: 404,
    message: 'Not Found'
  });
};

module.exports = {
  notFound
};