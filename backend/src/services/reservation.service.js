const { Reservation: reservationModel } = require('../models/reservation');
const { Reservation_Room } = require('../models/reservation_room');
const { Reservation_Service } = require('../models/reservation_service');
const { Op } = require('sequelize');

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
    const { startDate, endDate } = reservationData;

    const options = {
      // where: {
      //   [Op.or]: {
      //     startDate: {
      //       [Op.lte]: endDate
      //     },
      //     endDate: {
      //       [Op.gte]: startDate
      //     }
      //   }
      // }
      where: {
        [Op.or]: [
          {
            startDate: {
              [Op.between]: [startDate, endDate]
            }
          },
          {
            endDate: {
              [Op.between]: [startDate, endDate]
            }
          },
          {
            [Op.and]: [
              { startDate: { [Op.lte]: startDate } },
              { endDate: { [Op.gte]: endDate } }
            ]
          }
        ]
      },
      include: {
        all: true
      }
    };

    const reservations = await reservationModel.findAll(options);

    console.log(reservations.dataValues);

    if (!this.canReserve({ rooms, reservations })) {
      return null;
    }

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

  canReserve({ rooms, reservations }) {
    if (!rooms?.length || !reservations?.length) {
      return true;
    }

    return rooms
      .reduce((prev, room) => (
        prev && reservations.some(
          ({ rooms }) => (
            rooms.includes(room)
          ))
      ), true);
  }
}

module.exports = Reservation;
