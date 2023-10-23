const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Service extends Model{}

Service.init({
  
},
{
  sequelize, 
  modelName: 'Service'
});

module.exports = { Service };