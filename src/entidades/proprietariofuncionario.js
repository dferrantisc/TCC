const Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        "proprietariofuncionario", {
            idadm: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            login: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            senha: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            nome: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
        }, {
            sequelize,
            tableName: "proprietariofuncionario",
            schema: "public",
            timestamps: false,
            indexes: [{
                name: "proprietariofuncionario_pkey",
                unique: true,
                fields: [{ name: "idadm" }],
            }, ],
        }
    );
};