/* eslint-disable array-callback-return */
const jsonwebtoken = require("jsonwebtoken");

function Authenticate(request, response, next) {
  const { authorization } = request.headers;

  if (!authorization) response.status(400).json({ message: "Token inválido" });

  const [, token] = authorization.split(/\s+/);

  try {
    const user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    const { nome, email } = user;

    request.user = {
      id: user.sub,
      nome,
      email,
    };

    next();
  } catch (err) {
    response.status(400).json({ message: "Token inválido" });
  }
}

module.exports = Authenticate;
