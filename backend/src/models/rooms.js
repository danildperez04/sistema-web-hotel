const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Room extends Model {}

Room.init({
  code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price:{
    type: DataTypes.NUMBER,
    allowNull: false
  },
  state: {
    type: DataTypes.ENUM(['DISPONIBLE', 'OCUPADA', 'NO DISPONIBLE']),
    allowNull: false
  },
  // services atribute ---- m:n relationship
},
{
  sequelize,
  modelName: 'Room'
});

// Room.belongsToMany();

module.exports =  { Room };