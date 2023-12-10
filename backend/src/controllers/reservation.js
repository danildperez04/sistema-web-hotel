//TODO: Reservation Controller
const Reservation = require('../services/reservation.service');
const User = require('../services/users.service');
const Client = require('../services/client.service');
const reservationServices = new Reservation();
const userService = new User();
const clientService = new Client();

const getAll = async (req, res) => {
  const reservations = await reservationServices.getAll();

  res.send(reservations);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const foundReservation = await reservationServices.getOne(id);

  if (!foundReservation) {
    return res.status(404).send({
      message: 'Reservation not found'
    });
  }

  res.send(foundReservation);

};

const create = async (req, res) => {
  const { clientId, startDate, endDate, cancelled, services, rooms } = req.body;
  const { user } = req;

  const client = await clientService.getOne(clientId);

  if (!client) {
    return res.status(404).send({ message: 'client not found' });
  }

  const reservation = await reservationServices.create({
    userId: user.id,
    clientId,
    startDate,
    endDate,
    cancelled,
  }, { services, rooms });

  res.send(reservation);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { userId, clientId, startDate, endDate, cancelled, services, rooms } = req.body;
  const foundReservation = await reservationServices.getOne(id);

  if (!foundReservation) {
    return res.status(404).send({
      message: 'Reservation not found'
    });
  }

  const user = await userService.getOneById(userId);

  if (!user) {
    return res.status(404).send({ message: 'user not found' });
  }

  const client = await clientService.getOne(clientId);

  if (!client) {
    return res.status(404).send({ message: 'client not found' });
  }

  const reservationToUpdate = {
    userId,
    clientId,
    startDate,
    endDate,
    cancelled,
  };


  const reservationUpdated = await reservationServices.update(reservationToUpdate, { services, rooms }, id);
  res.send(reservationUpdated);

};

const remove = () => {

};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove
};