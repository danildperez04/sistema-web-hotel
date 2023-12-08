const { Reservation: reservationModel } = require('../models/reservation');
const { Room } = require('../models/rooms');
const { Service } = require('../models/services');

class Reservation {
  async getAll() {
    const reservations = await reservationModel.findAll({ include: { all: true } });

    return reservations;
  }

  async create(reservationData) {
    const reservation = await reservationModel.create(reservationData);
    const services = await Service.findAll();
    const rooms = await Room.findAll();

    services.forEach(async (service) => {
      await reservation.addService(service, {
        through:
        {
          servicePrice: service.price
        }
      });
    });

    rooms.forEach(async (room) => {
      await reservation.addRoom(room, {
        through: {
          roomPrice: room.price
        }
      });
    });

    return reservation;
  }
}

module.exports = Reservation;
