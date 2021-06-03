const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("TCC", "postgres", "pgbd", {
    host: "localhost",
    dialect: "postgres",
});

module.exports = sequelize;