const Sequelize = require("sequelize");

const DB_INFO = {
  host: "localhost",
  port: 3306,
  user: "boost",
  password: "1q2w3e",
  database: "boost",
  clearExpired: true,
};
const sequelize = new Sequelize(
  DB_INFO.database,
  DB_INFO.user,
  DB_INFO.password,
  {
    dialect: "mysql",
    host: DB_INFO.host,
    logging: false,
  }
);

module.exports = { sequelize, DB_INFO };
