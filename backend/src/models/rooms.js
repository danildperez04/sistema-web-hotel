const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Room extends Model { }

Room.init({
  code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'room'
});

module.exports = { Room };