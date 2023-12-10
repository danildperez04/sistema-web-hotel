const Auth = require('../services/auth.service');
const { HTTP_STATUS } = require('../utils/http');
const { create } = require('./users');
const authService = new Auth();

const login = async (req, res) => {
  const { username, password } = req.body;

  const token = await authService.login({ username, password });

  res.status(HTTP_STATUS.OK).send({
    token
  });
};

const signup = async (req, res) => {
  return await create(req, res);
};

module.exports = { login, signup };