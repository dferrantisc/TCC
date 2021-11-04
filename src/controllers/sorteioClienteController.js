const moment = require("moment");
const Sequelize = require("sequelize");
const entdds = require("../conexao");
const sorteio_cliente = require("../entidades/sorteio_cliente");
const RequisicaoInvalida = require("../errors/RequisicaoInvalida");
module.exports = {
  async create(id_sorteio, id_cliente) {
    try {
      console.log(id_sorteio, id_cliente);
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
      console.log(error);
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
  async findBySorteio(sorteio) {
    try {
      const sequelize = new Sequelize("TCC", "postgres", "pgbd", {
        host: "localhost",
        dialect: "postgres",
      });

      const sorteios = await sequelize.query(
        "select * from sorteio_cliente sc inner join usuariocliente u on u.iduc = sc.iduc where sc.idsort = :sorteio",
        { replacements: { sorteio }, type: sequelize.QueryTypes.SELECT }
      );
      return sorteios;
    } catch (error) {
      console.log(error);
      throw new RequisicaoInvalida("Nenhum cliente participando");
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
