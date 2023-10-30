const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Role extends Model{}

Role.init({
  name: {
    type: DataTypes.STRING,
  }
},{
  sequelize,
  modelName: 'role'
});

module.exports = {Role};