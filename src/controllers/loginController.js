const entdds = require("../conexao");
module.exports = {
    async login(login, senha) {
        const user = await entdds.proprietariofuncionario.findOne({
            where: { login },
        });

        if (senha == user.senha) {
            return true;
        } else {
            return false;
        }
    },
};