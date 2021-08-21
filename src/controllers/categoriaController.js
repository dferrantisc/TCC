const entdds = require("../conexao");
module.exports = {
    async create(nome) {
        try {
            const category = await entdds.categoria_produto.create({
                nome,
            });

            return await category.save();
        } catch (error) {
            console.log(error);
        }
    },
    async findAll() {
        try {
            const categories = await entdds.categoria_produto.findAll();
            return categories;
        } catch (error) {
            console.log(error);
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
            console.log(error);
        }
    },

    async update(id, nome) {
        try {
            const updatedCategory = await entdds.categoria_produto.update({ nome }, {
                where: {
                    idcatg: id,
                },
                returning: true,
            });
            return updatedCategory;
        } catch (error) {
            console.log(error);
        }
    },
};