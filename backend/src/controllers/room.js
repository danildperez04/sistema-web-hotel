const Room = require('../services/room.service');
const roomServices = new Room();

const getAll = async (req, res) => {
  const rooms = await roomServices.getAll();

  res.send(rooms);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const foundRoom = await roomServices.getOne(id);

  if (!foundRoom) {
    return res.status(404).send({
      message: 'Room not found'
    });
  }

  res.send(foundRoom);
};

const create = async (req, res) => {
  const {code, price, description} = req.body;
  const room = await roomServices.create({
    code,
    price,
    description,
  });

  res.send(room);
};

const update = async (req, res) => {
  const { id } = req.params;
  const {code, price, description} = req.body;
  const foundRoom = await roomServices.getOne(id);

  if (!foundRoom) {
    return res.status(404).send({
      message: 'Room not found'
    });
  }

  const roomToUpdate = {
    code,
    price,
    description,
  };

  const updatedRoom = await roomServices.update(roomToUpdate, id);

  res.send(updatedRoom);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const foundRoom = await roomServices.getOne(id);

  if (!foundRoom) {
    return res.status(404).send({
      message: 'Room not found'
    });
  }

  await roomServices.remove(id);

  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};