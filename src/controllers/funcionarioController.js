const entdds = require("../conexao");
const RequisicaoInvalida = require("../errors/RequisicaoInvalida");
const { findAll } = require("./categoriaController");
module.exports = {
    async create(nome, email, login, senha) {
        try {
            const user = await entdds.proprietariofuncionario.create({
                nome,
                email,
                login,
                senha,
            });

            return await user.save();
        } catch (error) {
            throw new RequisicaoInvalida("Cadastro Não Realizazdo!");
        }
    },

    async findAll() {
        try {
            const user = await entdds.proprietariofuncionario.findAll();
            return user;
        } catch (error) {
            throw new RequisicaoInvalida("Erro ao Buscar!");
        }
    },

    async delete(id) {
        try {
            const deletedFuncionario = await entdds.proprietariofuncionario.destroy({
                where: {
                    idadm: id,
                },
            });

            return deletedFuncionario;
        } catch (error) {
            throw new RequisicaoInvalida("Erro ao apagar Funcionario");
        }
    },

    async update(id, nome, login, email, senha) {
        try {
            const updatedFuncionario = await entdds.proprietariofuncionario.update({ nome, login, email, senha }, {
                where: {
                    idadm: id,
                },
                returning: true,
            });
            return updatedFuncionario;
        } catch (error) {
            console.log(error)
            throw new RequisicaoInvalida("Erro na Atualização");

        }
    },
};