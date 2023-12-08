const { Reservation: reservationModel } = require('../models/reservation');
const { Reservation_Room } = require('../models/reservation_room');
const { Reservation_Service } = require('../models/reservation_service');

class Reservation {
  async getAll() {
    const reservations = await reservationModel.findAll({
      include: [Reservation_Room, Reservation_Service]
    });

    return reservations;
  }

  async create(reservationData) {
    return await reservationModel.create(reservationData);
  }
}

module.exports = Reservation;
