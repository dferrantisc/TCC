const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuariocliente', {
    iduc: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    cpf: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    telefone: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    datadenascimento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'usuariocliente',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "usuariocliente_pkey",
        unique: true,
        fields: [
          { name: "iduc" },
        ]
      },
    ]
  });
};
