//TODO: Reservation Controller
const Reservation = require('../services/reservation.service');
const reservationServices = new Reservation();

const getAll = async (req, res) => {
  const reservations = await reservationServices.getAll();

  res.send(reservations);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const foundReservation = await reservationServices.getOne(id);

  if (!foundReservation) {
    return req.status(404).send({
      message: 'Reservationt not found'
    });
  }

  res.send(foundReservation);

};

const create = async (req, res) => {
  const { userId, clientId, startDate, endDate, cancelled } = req.body;

  const reservation = await reservationServices.create({
    userId,
    clientId,
    startDate,
    endDate,
    cancelled,
  });

  res.send(reservation);

};

const update = () => {

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