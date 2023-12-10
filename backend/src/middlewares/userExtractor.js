const jwt = require('jsonwebtoken');
const User = require('../services/users.service');
const userService = new User();

const userExtractor = async (req, res, next) => {
  const authorization = req.get('authorization');

  if (!authorization && !authorization?.toLowerCase()?.startsWith('bearer')) {
    return res.status(400).json({ error: 'authorization header missing or invalid' });
  }

  const token = authorization.substring(7);

  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!decodedToken?.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  req.user = await userService.getOneById(decodedToken.id);

  next();
};

module.exports = {
  userExtractor
};