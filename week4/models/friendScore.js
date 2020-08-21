const Sequelize = require("sequelize");

const { sequelize } = require("../util/database");

const FriendScore = sequelize.define("friendScore", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    host_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    friend_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    score: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

module.exports = FriendScore;
