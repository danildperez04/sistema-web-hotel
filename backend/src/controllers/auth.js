const Auth = require('../services/auth.service');
const authService = new Auth();

const login = async (req, res) => {
  const { username, password } = req.body;

  const token = await authService.login({ username, password });

  res.status(200).send({
    token
  });
};

module.exports = { login };