const bcrypt = require('bcrypt');
const User = require('../services/users.service');
const { NotFoundException, BadRequestException } = require('../utils/customErrors');
const userService = new User();

const getAll = async (req, res) => {
  const users = await userService.getAll();

  res.send(users);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const foundUser = await userService.getOneById(id);

  if (!foundUser) {
    throw new NotFoundException('user not found');
  }

  res.send(foundUser);
};

const create = async (req, res) => {
  const { firstName, lastName, email, username, password } = req.body;

  const foundUser = await userService.getOneBy({ username });

  if (foundUser) {
    throw new BadRequestException('username must be unique');
  }

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

const update = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, username, password } = req.body;
  const foundUser = await userService.getOneById(id);

  if (!foundUser) {
    throw new NotFoundException('user not found');
  }

  const passwordHash = password && await bcrypt.hash(password, 10);

  const userToUpdate = {
    firstName,
    lastName,
    email,
    username,
    password: passwordHash
  };

  const updatedRoom = await userService.update(userToUpdate, id);

  res.send(updatedRoom);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const foundUser = await userService.getOneById(id);

  if (!foundUser) {
    throw new NotFoundException('user not found');
  }

  await userService.remove(id);

  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove
};