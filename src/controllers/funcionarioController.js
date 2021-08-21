const entdds = require("../conexao");
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
            console.log(error);
        }
    },
};