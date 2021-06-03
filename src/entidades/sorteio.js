const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sorteio', {
    idsort: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    descricao: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    quantidade_ganhadores: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imagem: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'sorteio',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "sorteio_pkey",
        unique: true,
        fields: [
          { name: "idsort" },
        ]
      },
    ]
  });
};
