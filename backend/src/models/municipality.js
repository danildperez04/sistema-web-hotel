const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
const { Department } = require('./department');

class Municipality extends Model { }

Municipality.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'municipality'
});

Department.hasMany(Municipality);
Municipality.belongsTo(Department);

module.exports = { Municipality };
