const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
const { Service } = require('./services');
const { Room } = require('./rooms');

class Reservation extends Model{}

Reservation.init({
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true
  }
},
{
  sequelize,
  modelName: 'reservation'
});

Reservation.belongsToMany(Room, {through: 'reservation_room'});
Room.belongsToMany(Reservation, {through: 'reservation_room'});

Reservation.belongsToMany(Service, {through: 'reservation_service'});
Service.belongsToMany(Reservation, {through: 'reservation_service'});

module.exports = { Reservation };