//TODO: Reservation Controller
const Reservation = require('../services/reservation.service');
const Client = require('../services/client.service');
const { NotFoundException } = require('../utils/customErrors');
const reservationServices = new Reservation();
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
    throw new NotFoundException('client not found');
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
  const { clientId, startDate, endDate, cancelled, services, rooms } = req.body;
  const { user } = req;

  const foundReservation = await reservationServices.getOne(id);

  if (!foundReservation) {
    return res.status(404).send({
      message: 'Reservation not found'
    });
  }

  const client = await clientService.getOne(clientId);

  if (!client) {
    return res.status(404).send({ message: 'client not found' });
  }

  const reservationToUpdate = {
    userId: user.id,
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