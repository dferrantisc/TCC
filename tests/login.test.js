const LoginController = require("../src/controllers/loginController");
const entdds = require("../src/conexao");
beforeEach(async() => {
    const user = await entdds.proprietariofuncionario.create({
        login: "ali",
        senha: "1234",
        nome: "alisson",
        email: "asdasd@mail.com",
    });
});
afterEach(async() => {
    await entdds.proprietariofuncionario.destroy({
        where: { login: "ali" },
    });
});

test("Testa Login", async() => {
    expect(await LoginController.login("ali", "1234")).toBe(true);
});