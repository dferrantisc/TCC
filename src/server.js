const express = require("express");
const bdconex = require("./conexao");

const initModels = require("./entidades/init-models");

const app = express();

//bdconex.authenticate().then(() => console.log("Banco de Dados conectado"));
const entdds = initModels(bdconex);
const user = entdds.usuariocliente.create({ nome: "alisson", cpf: "000.269.2541.01", email: "asdasd@mail.com", telefone: "14578899", datadenascimento: "10.08.1997" })

app.listen(3000, () => console.log("server conectado"));