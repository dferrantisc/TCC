const { Sequelize } = require("sequelize");
const initModels = require("./entidades/init-models");

const sequelize = new Sequelize("TCC", "postgres", "895b88", {
    host: "localhost",
    dialect: "postgres",
});

const entdds = initModels(sequelize);

module.exports = entdds;