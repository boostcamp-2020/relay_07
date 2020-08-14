const Sequelize = require("sequelize");

const sequelize = new Sequelize("test", "root", "zxzx1306", {
  dialect: "mysql",
  host: "127.0.0.1",
  logging: false
});

module.exports = sequelize;
