const entdds = require("../conexao");
const produtos = require("../entidades/produtos");
const RequisicaoInvalida = require("../errors/RequisicaoInvalida");
module.exports = {
  async create(nome) {
    try {
      const categoryExists = await entdds.categoria_produto.findOne({
        where: { nome },
      });
      if (categoryExists) throw new RequisicaoInvalida("Categoria já existe");
      const category = await entdds.categoria_produto.create({
        nome,
      });

      return await category.save();
    } catch (error) {
      if (error.statusCode) throw error;
      throw new RequisicaoInvalida("Error ao criar categoria");
    }
  },
  async findAll() {
    try {
      const categories = await entdds.categoria_produto.findAll({
        include: "produtos",
      });

      const formattedCategories = categories.map((category) => {
        const categoryValues = category.get({ plain: true });

        return { ...categoryValues, produtos: categoryValues.produtos.length };
      });

      return formattedCategories;
    } catch (error) {
      throw new RequisicaoInvalida("Erro na busca");
    }
  },

  async delete(id) {
    try {
      const deletedCategory = await entdds.categoria_produto.destroy({
        where: {
          idcatg: id,
        },
      });

      return deletedCategory;
    } catch (error) {
      throw new RequisicaoInvalida("Erro ao apagar a Categoria");
    }
  },

  async update(id, nome) {
    try {
      const updatedCategory = await entdds.categoria_produto.update(
        { nome },
        {
          where: {
            idcatg: id,
          },
          returning: true,
        }
      );
      return updatedCategory;
    } catch (error) {
      throw new RequisicaoInvalida("Erro na Atualização");
    }
  },
};
