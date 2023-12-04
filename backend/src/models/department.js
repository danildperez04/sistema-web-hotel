const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Department extends Model { }

Department.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'department'
});

module.exports = { Department };