module.exports = {
  db: {
    dialect: process.env.DB_DIALECT || 'mysql',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_NAME,
  },
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
};
