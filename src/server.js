require("express-async-errors");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const Routes = require("./routes");
const { DefaultApplicationError } = require("./errors/DefaultApplicationError");

const app = express();
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use(Routes);

// Errors
app.use((error, req, res, next) => {
  /* istanbul ignore next */
  if (!error) {
    return next();
  }

  /* istanbul ignore next */
  if (process.env.DEBUG === "1") {
    console.error(error);
  }

  if (error.statusCode) {
    return res.status(error.statusCode).json({
      error: error.name,
      message: error.message,
      statusCode: error.statusCode,
      messages: error.messages,
    });
  }

  console.log(error);

  return res.status(500).json({
    error: error.name,
    message: "Algo deu errado",
    statusCode: 500,
    messages: ["Algo deu errado"],
  });
});

//bdconex.authenticate().then(() => console.log("Banco de Dados conectado"));
/*
const user = entdds.usuariocliente.create({
    nome: "alisson",
    cpf: "000.269.2541.01",
    email: "asdasd@mail.com",
    telefone: "14578899",
    datadenascimento: "10.08.1997",
});*/

app.listen(5000, () => console.log("server conectado"));
