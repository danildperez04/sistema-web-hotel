const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
const { Service } = require('./services');
const { Room } = require('./rooms');
const { Reservation_Room } = require('./reservation_room');
const { Reservation_Service } = require('./reservation_service');
const { Client } = require('./client');
const { User } = require('./user');

class Reservation extends Model { }

Reservation.init({
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  cancelled: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'reservation'
});

Client.hasMany(Reservation);
Reservation.belongsTo(Client);
User.hasMany(Reservation);
Reservation.belongsTo(User);

Reservation.belongsToMany(Room, { through: Reservation_Room });
Room.belongsToMany(Reservation, { through: Reservation_Room });

Reservation.belongsToMany(Service, { through: Reservation_Service });
Service.belongsToMany(Reservation, { through: Reservation_Service });

module.exports = { Reservation };