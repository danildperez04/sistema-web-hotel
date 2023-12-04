const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db.js');

class Reservation_Room extends Model { }

Reservation_Room.init({
  roomPrice: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'reservation_room'
});

module.exports = { Reservation_Room };