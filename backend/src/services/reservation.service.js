const { Reservation: reservationModel } = require('../models/reservation');

class Reservation {
  async getAll() {
    const reservations = await reservationModel.findAll({
      include: { all: true }
    });

    return reservations;
  }

  async getOne(id) {
    const reservation = await reservationModel.findAll({
      where: { id },
      include: { all: true }
    });

    return reservation;
  }

  async create(reservationData, { services, rooms }) {
    const reservation = await reservationModel.create(reservationData);

    if (services && services.length > 0) {
      services.forEach(async (service) => {
        await reservation.addService(service.id, {
          through:
          {
            servicePrice: service.price
          }
        });
      });
    }

    if (rooms && rooms.length > 0) {
      rooms.forEach(async (room) => {
        await reservation.addRoom(room.id, {
          through: {
            roomPrice: room.price
          }
        });
      });
    }

    return reservation;
  }

  async update() {

  }
}

module.exports = Reservation;
