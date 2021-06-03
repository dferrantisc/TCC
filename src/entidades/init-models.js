var DataTypes = require("sequelize").DataTypes;
var _categoria_produto = require("./categoria_produto");
var _ganhadores = require("./ganhadores");
var _produtos = require("./produtos");
var _proprietariofuncionario = require("./proprietariofuncionario");
var _sorteio = require("./sorteio");
var _sorteio_cliente = require("./sorteio_cliente");
var _usuariocliente = require("./usuariocliente");

function initModels(sequelize) {
  var categoria_produto = _categoria_produto(sequelize, DataTypes);
  var ganhadores = _ganhadores(sequelize, DataTypes);
  var produtos = _produtos(sequelize, DataTypes);
  var proprietariofuncionario = _proprietariofuncionario(sequelize, DataTypes);
  var sorteio = _sorteio(sequelize, DataTypes);
  var sorteio_cliente = _sorteio_cliente(sequelize, DataTypes);
  var usuariocliente = _usuariocliente(sequelize, DataTypes);

  produtos.belongsTo(categoria_produto, { as: "idcatg_categoria_produto", foreignKey: "idcatg"});
  categoria_produto.hasMany(produtos, { as: "produtos", foreignKey: "idcatg"});
  produtos.belongsTo(proprietariofuncionario, { as: "idadm_proprietariofuncionario", foreignKey: "idadm"});
  proprietariofuncionario.hasMany(produtos, { as: "produtos", foreignKey: "idadm"});
  ganhadores.belongsTo(sorteio, { as: "idsort_sorteio", foreignKey: "idsort"});
  sorteio.hasMany(ganhadores, { as: "ganhadores", foreignKey: "idsort"});
  sorteio_cliente.belongsTo(sorteio, { as: "idsort_sorteio", foreignKey: "idsort"});
  sorteio.hasMany(sorteio_cliente, { as: "sorteio_clientes", foreignKey: "idsort"});
  ganhadores.belongsTo(usuariocliente, { as: "iduc_usuariocliente", foreignKey: "iduc"});
  usuariocliente.hasMany(ganhadores, { as: "ganhadores", foreignKey: "iduc"});
  sorteio_cliente.belongsTo(usuariocliente, { as: "iduc_usuariocliente", foreignKey: "iduc"});
  usuariocliente.hasMany(sorteio_cliente, { as: "sorteio_clientes", foreignKey: "iduc"});

  return {
    categoria_produto,
    ganhadores,
    produtos,
    proprietariofuncionario,
    sorteio,
    sorteio_cliente,
    usuariocliente,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
