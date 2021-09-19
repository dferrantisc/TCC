const moment = require("moment");
const entdds = require("../conexao");
module.exports = {
  async create(nome, email, cpf, data_nascimento, telefone) {
    try {
      const user = await entdds.usuariocliente.create({
        nome,
        email,
        cpf,
        datadenascimento: moment(data_nascimento, "DD/MM/YYYY"),
        telefone,
      });

      return await user.save();
    } catch (error) {
      throw new RequisicaoInvalida("Cadastro Não Realizado");
    }
  },
};
