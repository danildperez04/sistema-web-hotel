const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
const { Departament } = require('./departament');

class Municipality extends Model{}

Municipality.init({
  name:{
    type: DataTypes.STRING,
    allowNull: false,
  },
},
{
  sequelize,
  modelName: 'municipality'
});

Departament.hasMany(Municipality);
Municipality.belongsTo(Departament);

module.exports = {Municipality};
