const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db.js');

class Reservation_Service extends Model { }

Reservation_Service.init({
  servicePrice: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'reservation_service'
});

module.exports = { Reservation_Service };