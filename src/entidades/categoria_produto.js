const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('categoria_produto', {
    idcatg: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'categoria_produto',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "categoria_produto_pkey",
        unique: true,
        fields: [
          { name: "idcatg" },
        ]
      },
    ]
  });
};
