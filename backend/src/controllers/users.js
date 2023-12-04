const bcrypt = require('bcrypt');
const User = require('../services/users.service');
const userService = new User();

const getAll = async (req, res) => {
  const users = await userService.getAll();

  res.send(users);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const foundUser = await userService.getOne(id);

  if (!foundUser) {
    return res.status(404).send({
      message: 'User not found',
    });
  }

  res.send(foundUser);
};

const create = async (req, res) => {
  const { firstName, lastName, email, username, password } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await userService.create({
    firstName,
    lastName,
    email,
    username,
    password: passwordHash
  });

  res.send(user);
};

const update = async () => {

};

const remove = async () => {

};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove
};