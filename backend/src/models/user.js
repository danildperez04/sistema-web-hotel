const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
const { Role } = require('./role');

class User extends Model{}

User.init({
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username:{
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, 
{
  sequelize, 
  modelName: 'user'
});

User.Role = User.belongsTo(Role);

module.exports = { User };