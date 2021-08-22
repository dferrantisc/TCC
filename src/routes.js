const router = require("express").Router();
const LoginController = require("./controllers/loginController");
const FuncionarioController = require("./controllers/funcionarioController");
const clienteController = require("./controllers/clienteController");
const categoriaController = require("./controllers/categoriaController");
const { request, response } = require("express");
const produtoController = require("./controllers/produtoController");
const { sorteio_cliente } = require("./conexao");
const sorteioController = require("./controllers/sorteioController");
const sorteioClienteController = require("./controllers/sorteioClienteController");

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

router.delete("/categoria/:id", async(request, response) => {
    const { id } = request.params;
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

router.delete("/produto/:id", async(request, response) => {
    const { id } = request.params;
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

//SORTEIO
router.post("/sorteio", async(request, response) => {
    const { nome, descricao, quantidade_ganhadores, imagem } = request.body;
    response.send(
        await sorteioController.create(
            nome,
            descricao,
            quantidade_ganhadores,
            imagem
        )
    );
});
router.get("/sorteio", async(request, response) => {
    const { id } = request.params;
    response.send(await sorteioController.findAll(id));
});
router.get("/sorteio/:id", async(request, response) => {
    const { id } = request.params;
    response.send(await sorteioController.findOne(id));
});
router.delete("/sorteio/:id", async(request, response) => {
    const { id } = request.params;
    const deletedSorteio = await sorteioController.delete(id);
    response.json(deletedSorteio);
});

router.put("/sorteio/:id", async(request, response) => {
    const { id } = request.params;
    const { nome, descricao, quantidade_ganhadores, imagem } = request.body;
    const updatedSorteios = await sorteioController.update(
        id,
        nome,
        descricao,
        quantidade_ganhadores,
        imagem
    );
    response.json(updatedSorteios);
});

//Validaçao do Cliente no Sorteio /sorteio/cliente/
router.post("/sorteio/cliente", async(request, response) => {
    const { id_sorteio, id_cliente } = request.body;
    response.send(await sorteioClienteController.create(id_sorteio, id_cliente));
});

module.exports = router;