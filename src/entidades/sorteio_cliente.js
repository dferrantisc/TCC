const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sorteio_cliente', {
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
    tableName: 'sorteio_cliente',
    schema: 'public',
    timestamps: false
  });
};
