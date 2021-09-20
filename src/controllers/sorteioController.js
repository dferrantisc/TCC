const entdds = require("../conexao");
module.exports = {
  async create(nome, descricao, quantidade_ganhadores, imagem) {
    try {
      const sorteios = await entdds.sorteio.create({
        nome,
        descricao,
        quantidade_ganhadores,
        imagem,
      });

      return await sorteios.save();
    } catch (error) {
      throw new RequisicaoInvalida("Sorteio Não Realizado!");
    }
  },

  async findAll() {
    try {
      const sorteios = await entdds.sorteio.findAll();
      return sorteios;
    } catch (error) {
      throw new RequisicaoInvalida("Erro na Busca!");
    }
  },
  async findOne(id) {
    try {
      const sorteio = await entdds.sorteio.findOne({
        where: { idsort: id },
      });
      return sorteio;
    } catch (error) {
      throw new RequisicaoInvalida("Erro");
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

  async update(id, nome, descricao, quantidade_ganhadores, imagem) {
    try {
      const updatedSorteios = await entdds.sorteio.update(
        { nome, descricao, quantidade_ganhadores, imagem },
        {
          where: {
            idsort: id,
          },
          returning: true,
        }
      );
      return updatedSorteios;
    } catch (error) {
      throw new RequisicaoInvalida("Erro na Atualização!");
    }
  },
};