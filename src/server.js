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
app.use(express.static("public"));

app.use(Routes);

// Errors
app.use((error, req, res, next) => {
  /* istanbul ignore next */
  if (!error) {
    return next();
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

app.listen(5000, () => console.log("server conectado"));
