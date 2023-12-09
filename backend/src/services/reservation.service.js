const { Reservation: reservationModel } = require('../models/reservation');
const { Reservation_Room } = require('../models/reservation_room');
const { Reservation_Service } = require('../models/reservation_service');

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

  async update(reservationData, { services, rooms }, id) {
    await reservationModel.update(reservationData, { where: { id } });

    const reservation = await reservationModel.findOne({ where: { id } });

    if (!services || !services.length > 0) {
      await Reservation_Service.destroy({ where: { 'reservationId': id } });
    }

    if (!rooms || !rooms.length > 0) {
      await Reservation_Room.destroy({ where: { 'reservationId': id } });
    }

    if (services && services.length > 0) {
      await Reservation_Service.destroy({ where: { 'reservationId': id } });
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
      await Reservation_Room.destroy({ where: { 'reservationId': id } });
      rooms.forEach(async (room) => {
        await reservation.addRoom(room.id, {
          through: {
            roomPrice: room.price
          }
        });
      });
    }

    return await reservation.save();
  }
}

module.exports = Reservation;
