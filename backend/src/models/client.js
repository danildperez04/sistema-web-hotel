
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
const { Municipality } = require('./municipality');

class Client extends Model{}

Client.init({
  dni: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fullName:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  address: {
    type : DataTypes.STRING,
    allowNull: false,
  },
  birthDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
},
{
  sequelize,
  modelName: 'client'
});

Municipality.hasMany(Client);
Client.belongsTo(Municipality);

