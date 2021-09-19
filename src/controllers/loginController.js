const jsonwebtoken = require("jsonwebtoken");
const RequisicaoInvalida = require("../errors/RequisicaoInvalida");
const entdds = require("../conexao");

module.exports = {
  async login(login, senha) {
    try {
      const user = await entdds.proprietariofuncionario.findOne({
        where: { login },
      });

      if (senha == user.senha) {
        const token = jsonwebtoken.sign(
          { email: user.email },
          process.env.JWT_SECRET,
          {
            subject: String(user.idadm),
          }
        );
        return {
          user: {
            id: user.idadm,
            nome: user.nome,
            email: user.email,
          },
          token,
        };
      } else {
        throw new Error();
      }
    } catch (error) {
      throw new RequisicaoInvalida("Login inválido");
    }
  },

  async check(userToken) {
    try {
      const token = jsonwebtoken.verify(userToken, process.env.JWT_SECRET);

      if (token.email) {
        const user = await entdds.proprietariofuncionario.findOne({
          where: { email: token.email },
        });

        return { id: user.idadm, nome: user.nome, email: user.email };
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      throw new RequisicaoInvalida("Token inválido");
    }
  },
};
