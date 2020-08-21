const Sequelize = require("sequelize");

const DB_INFO = {
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "martial1!",
  database: "mydb",
  clearExpired: true,
};
const sequelize = new Sequelize("mydb", "root", "martial1!", {
  dialect: "mysql",
  host: "127.0.0.1",
  port : "3306",
  logging: false,
});

module.exports = { sequelize, DB_INFO };