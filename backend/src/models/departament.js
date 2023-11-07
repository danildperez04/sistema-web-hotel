const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Departament extends Model{}

Departament.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
},
{
  sequelize,
  modelName: 'departament'
});

module.exports = {Departament};