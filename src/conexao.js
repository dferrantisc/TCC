const { Sequelize } = require('sequelize')
const initModels = require('./entidades/init-models')

const sequelize = new Sequelize('TCC', 'postgres', 'pgbd', {
    host: 'localhost',
    dialect: 'postgres'
})

const entdds = initModels(sequelize)

module.exports = entdds