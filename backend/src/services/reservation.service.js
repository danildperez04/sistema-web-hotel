const { Reservation: reservationModel } = require('../models/reservation');
const { Room } = require('../models/rooms');
const { Service } = require('../models/services');

class Reservation {
  async getAll() {
    const reservations = await reservationModel.findAll({ include: { all: true } });

    return reservations;
  }

  async create(reservationData) {
    return await reservationModel.create(reservationData);
  }
}

module.exports = Reservation;
