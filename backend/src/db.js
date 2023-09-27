const Sequelize = require('sequelize');
const { db: {dialect, user, password, host, port, database} } = require('./config/config');

const sequelize = new Sequelize(`${dialect}://${user}:${password}@${host}:${port}/${database}`);


module.exports = sequelize;
