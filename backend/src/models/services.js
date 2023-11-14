const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Service extends Model { }

Service.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  details: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'service'
});

module.exports = { Service };