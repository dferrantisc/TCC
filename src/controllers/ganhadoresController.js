const RequisicaoInvalida = require("../errors/RequisicaoInvalida");
const Sequelize = require("sequelize");
const entdds = require("../conexao");
const shuffleArray = require("../utils/shuffleArray");
module.exports = {
  async create(sorteio) {
    try {
      const sorteioRealizado = await entdds.ganhadores.findAll({
        where: {
          idsort: sorteio,
        },
        include: [{ model: entdds.usuariocliente, as: "iduc_usuariocliente" }],
      });

      if (sorteioRealizado.length > 0)
        return sorteioRealizado.map(
          (ganhadores) => ganhadores.iduc_usuariocliente
        );

      const sorteios = await entdds.sorteio.findOne({
        where: {
          idsort: sorteio,
        },
      });

      const { quantidade_ganhadores } = sorteios;

      const sequelize = new Sequelize("TCC", "postgres", "pgbd", {
        host: "localhost",
        dialect: "postgres",
      });

      const participantes = await sequelize.query(
        "select * from sorteio_cliente sc inner join usuariocliente u on u.iduc = sc.iduc where sc.idsort = :sorteio",
        { replacements: { sorteio }, type: sequelize.QueryTypes.SELECT }
      );

      const ganhadores = shuffleArray(participantes).splice(
        0,
        quantidade_ganhadores
      );

      ganhadores.map(async (ganhador) => {
        await entdds.ganhadores.create({
          iduc: ganhador.iduc,
          idsort: ganhador.idsort,
        });
      });

      return ganhadores;
    } catch (error) {
      console.log(error);
      throw new RequisicaoInvalida("Erro ao realizar sorteio!");
    }
  },

  async findAll(sorteio) {
    try {
      const sorteioRealizado = await entdds.ganhadores.findAll({
        where: {
          idsort: sorteio,
        },
        include: [{ model: entdds.usuariocliente, as: "iduc_usuariocliente" }],
      });

      return sorteioRealizado.map(
        (ganhadores) => ganhadores.iduc_usuariocliente
      );
    } catch (error) {
      throw new RequisicaoInvalida("Erro na Busca!");
    }
  },
};
