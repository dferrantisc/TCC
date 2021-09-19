const moment = require("moment");
const entdds = require("../conexao");
const sorteio_cliente = require("../entidades/sorteio_cliente");
module.exports = {
  async create(id_sorteio, id_cliente) {
    try {
      const cliente = await entdds.usuariocliente.findOne({
        where: { iduc: id_cliente },
      });

      const differenceBeteweenDatesInYears = moment().diff(
        cliente.datadenascimento,
        "years"
      );

      if (differenceBeteweenDatesInYears < 18) {
        throw new Error("Idade inválida");
      }

      const sorteioCliente = await entdds.sorteio_cliente.create({
        iduc: id_cliente,
        idsort: id_sorteio,
      });

      return await sorteioCliente.save();
    } catch (error) {
      throw new RequisicaoInvalida("Sorteio Não foi Liberado!");
    }
  },
  async findAll() {
    try {
      const sorteios = await entdds.sorteio.findAll();
      return sorteios;
    } catch (error) {
      throw new RequisicaoInvalida("Erro na Busca dos Sorteios");
    }
  },
  async findOne(id) {
    try {
      const sorteio = await entdds.sorteio.findOne({
        where: { idsort: id },
      });
      return sorteio;
    } catch (error) {
      throw new RequisicaoInvalida("Erro!");
    }
  },
  async delete(id) {
    try {
      const deletedSorteio = await entdds.sorteio.destroy({
        where: {
          idsort: id,
        },
      });

      return deletedSorteio;
    } catch (error) {
      throw new RequisicaoInvalida("Erro ao Apagar o Sorteio!");
    }
  },

  async update(id_cliente, id_sorteio) {
    try {
      const updatedSorteioCliente = await entdds.updatedSorteioCliente.update(
        { id_cliente, id_sorteio },
        {
          where: {
            idsort: id_sorteio,
            iduc: id_cliente,
          },
          returning: true,
        }
      );
      return updatedSorteioCliente;
    } catch (error) {
      throw new RequisicaoInvalida("Erro na Atualização!");
    }
  },
};
