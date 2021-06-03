const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ganhadores', {
    iduc: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'usuariocliente',
        key: 'iduc'
      }
    },
    idsort: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'sorteio',
        key: 'idsort'
      }
    }
  }, {
    sequelize,
    tableName: 'ganhadores',
    schema: 'public',
    timestamps: false
  });
};
