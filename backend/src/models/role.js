const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
const { User } = require('./user');

class Role extends Model{}

Role.init({
  name: {
    type: DataTypes.STRING,
  }
},{
  sequelize,
  modelName: 'role'
});

Role.hasMany(User, {
  foreignKey: 'roleId'
});
User.belongsTo(Role);

module.exports = {Role};