const express = require("express");
const bdconex = require("./conexao");

const app = express();

bdconex.authenticate().then(() => console.log("Banco de Dados conectado"));

app.listen(3000, () => console.log("server conectado"));