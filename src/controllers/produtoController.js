const entdds = require("../conexao");
const produtos = require("../entidades/produtos");
const { findAll } = require("./categoriaController");
module.exports = {
    async create(nome, preco, idadm, idcatg) {
        try {
            const produto = await entdds.produtos.create({
                nome,
                preço: preco,
                idadm,
                idcatg,
            });

            return await produto.save();
        } catch (error) {
            console.log(error);
        }
    },

    async findAll() {
        try {
            const produtos = await entdds.produtos.findAll();
            return produtos;
        } catch (error) {
            console.log(error);
        }
    },
    async findOne(id) {
        try {
            const produto = await entdds.produtos.findOne({
                where: { id },
                include: "categoria_produto",
            });
            return produto;
        } catch (error) {
            console.log(error);
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
            console.log(error);
        }
    },

    async update(id, nome, preco, idadm, idcatg) {
        try {
            const updatedProduct = await entdds.produtos.update({ nome, preço: preco, idadm, idcatg }, {
                where: {
                    id,
                },
                returning: true,
            });
            return updatedProduct;
        } catch (error) {
            console.log(error);
        }
    },
};