const DefaultApplicationError = require("./DefaultApplicationError");

class RequisicaoInvalida extends DefaultApplicationError {
  name = "RequisicaoInvalida";
  statusCode = 400;
}

module.exports = RequisicaoInvalida;
