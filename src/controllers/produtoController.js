const entdds = require("../conexao");
const produtos = require("../entidades/produtos");
const RequisicaoInvalida = require("../errors/RequisicaoInvalida");
module.exports = {
    async create(nome, preco, idadm, idcatg, img, descricao) {
        try {
            const produto = await entdds.produtos.create({
                nome,
                preço: preco,
                idadm,
                idcatg,
                img,
                descricao,
            });

            return await produto.save();
        } catch (error) {
            throw new RequisicaoInvalida("O Produto Não foi cadastrado!");
        }
    },

    async findAll() {
        try {
            const produtos = await entdds.produtos.findAll({
                include: "categoria",
            });
            return produtos;
        } catch (error) {
            throw new RequisicaoInvalida("O Produto Não foi encontrado!");
        }
    },
    async findOne(id) {
        try {
            const produto = await entdds.produtos.findOne({
                include: "categoria",
                where: { id },
            });
            return produto;
        } catch (error) {
            throw new RequisicaoInvalida("Erro");
        }
    },
    async findByCategoria(id) {
        try {
            const produto = await entdds.produtos.findAll({
                include: [{
                    model: entdds.categoria_produto,
                    as: "categoria",
                    where: { idcatg: id },
                }, ],
            });
            return produto;
        } catch (error) {
            throw new RequisicaoInvalida("Erro");
        }
    },
    async delete(id) {
        try {
            const deletedProduct = await entdds.produtos.destroy({
                where: {
                    id,
                },
            });

            return deletedProduct;
        } catch (error) {
            throw new RequisicaoInvalida("Erro ao Deletar Produto!");
        }
    },

    async update(id, nome, preco, idadm, idcatg, img, descricao) {
        try {
            const updatedProduct = await entdds.produtos.update({ nome, preço: preco, idadm, idcatg, img, descricao }, {
                where: {
                    id,
                },
                returning: true,
            });

            return updatedProduct;
        } catch (error) {
            throw new RequisicaoInvalida("Erro na Atualização do Produto!");
        }
    },
};