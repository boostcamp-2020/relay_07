const Sequelize = require("sequelize");

const sequelize = new Sequelize("dbName", "user-id", "password", {
  dialect: "mysql",
  host: "host-ip",
  logging: false,
});

module.exports = sequelize;
