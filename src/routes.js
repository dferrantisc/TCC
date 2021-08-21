const router = require("express").Router();
const LoginController = require("./controllers/loginController");
const FuncionarioController = require("./controllers/funcionarioController");
const clienteController = require("./controllers/clienteController");
const categoriaController = require("./controllers/categoriaController");
const { request, response } = require("express");
const produtoController = require("./controllers/produtoController");

// AUTENTICAÇÃO
router.post("/login", async(request, response) => {
    const { login, senha } = request.body;
    response.send(await LoginController.login(login, senha));
});

// FUNCIONARIO
router.post("/funcionario", async(request, response) => {
    const { nome, email, login, senha } = request.body;

    const funcionario = await FuncionarioController.create(
        nome,
        email,
        login,
        senha
    );

    response.send(funcionario);
});

// CLIENTE
router.post("/cliente", async(request, response) => {
    const { nome, telefone, data_nascimento, cpf, email } = request.body;
    response.send(
        await clienteController.create(nome, email, cpf, data_nascimento, telefone)
    );
});

// CATEGORIA
router.get("/categoria", async(request, response) => {
    response.send(await categoriaController.findAll());
});

router.post("/categoria", async(request, response) => {
    const { nome } = request.body;
    response.send(await categoriaController.create(nome));
});

router.delete("/categoria", async(request, response) => {
    const { id } = request.body;
    const deletedCategory = await categoriaController.delete(id);
    response.json(deletedCategory);
});

router.put("/categoria/:id", async(request, response) => {
    const { id } = request.params;
    const { nome } = request.body;
    const updatedCategory = await categoriaController.update(id, nome);
    response.json(updatedCategory);
});

// PRODUTO
router.post("/produto", async(request, response) => {
    const { nome, preco, idadm, idcatg } = request.body;
    response.send(await produtoController.create(nome, preco, idadm, idcatg));
});

router.get("/produto", async(request, response) => {
    response.send(await produtoController.findAll());
});

router.get("/produto/:id", async(request, response) => {
    const { id } = request.params;
    response.send(await produtoController.findOne(id));
});

router.delete("/produto", async(request, response) => {
    const { id } = request.body;
    const deletedProduct = await produtoController.delete(id);
    response.json(deletedProduct);
});

router.put("/produto/:id", async(request, response) => {
    const { id } = request.params;
    const { nome, preco, idadm, idcatg } = request.body;
    const updatedProduct = await produtoController.update(
        id,
        nome,
        preco,
        idadm,
        idcatg
    );
    response.json(updatedProduct);
});

module.exports = router;