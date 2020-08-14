const Sequelize = require("sequelize");

const DB_INFO = {
  host: "192.168.99.100",
  port: "9876",
  user: "root",
  password: "password",
  database: "mydb",
  clearExpired: true,
};
const sequelize = new Sequelize("mydb", "root", "password", {
  dialect: "mysql",
  host: "192.168.99.100",
  port : "9876",
  logging: false,
});

module.exports = { sequelize, DB_INFO };
