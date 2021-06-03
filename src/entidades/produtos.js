const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('produtos', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    'preço': {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    idadm: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'proprietariofuncionario',
        key: 'idadm'
      }
    },
    idcatg: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categoria_produto',
        key: 'idcatg'
      }
    }
  }, {
    sequelize,
    tableName: 'produtos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "produtos_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
