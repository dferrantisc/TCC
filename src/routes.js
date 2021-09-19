const router = require("express").Router();
const LoginController = require("./controllers/loginController");
const FuncionarioController = require("./controllers/funcionarioController");
const clienteController = require("./controllers/clienteController");
const categoriaController = require("./controllers/categoriaController");
const produtoController = require("./controllers/produtoController");
const sorteioController = require("./controllers/sorteioController");
const sorteioClienteController = require("./controllers/sorteioClienteController");
const Authenticate = require("./middlewares/Authenticate");

// AUTENTICAÇÃO
router.post("/login", async (request, response) => {
  const { login, senha } = request.body;
  response.json(await LoginController.login(login, senha));
});

router.get("/me", async (request, response) => {
  const { authorization } = request.headers;

  const [, token] = authorization.split(/\s+/);

  response.json(await LoginController.check(token));
});

// FUNCIONARIO
router.post("/funcionario", Authenticate, async (request, response) => {
  const { nome, email, login, senha } = request.body;

  const funcionario = await FuncionarioController.create(
    nome,
    email,
    login,
    senha
  );

  response.json(funcionario);
});

// CLIENTE
router.post("/cliente", async (request, response) => {
  const { nome, telefone, data_nascimento, cpf, email } = request.body;
  response.json(
    await clienteController.create(nome, email, cpf, data_nascimento, telefone)
  );
});

// CATEGORIA
router.get("/categoria", Authenticate, async (request, response) => {
  response.json(await categoriaController.findAll());
});

router.post("/categoria", Authenticate, async (request, response) => {
  const { nome } = request.body;
  response.json(await categoriaController.create(nome));
});

router.delete("/categoria/:id", Authenticate, async (request, response) => {
  const { id } = request.params;
  const deletedCategory = await categoriaController.delete(id);
  response.json(deletedCategory);
});

router.put("/categoria/:id", Authenticate, async (request, response) => {
  const { id } = request.params;
  const { nome } = request.body;
  const updatedCategory = await categoriaController.update(id, nome);
  response.json(updatedCategory);
});

// PRODUTO
router.post("/produto", Authenticate, async (request, response) => {
  const { nome, preco, idadm, idcatg } = request.body;
  response.json(await produtoController.create(nome, preco, idadm, idcatg));
});

router.get("/produto", Authenticate, async (request, response) => {
  response.json(await produtoController.findAll());
});

router.get("/produto/:id", Authenticate, async (request, response) => {
  const { id } = request.params;
  response.json(await produtoController.findOne(id));
});

router.delete("/produto/:id", Authenticate, async (request, response) => {
  const { id } = request.params;
  const deletedProduct = await produtoController.delete(id);
  response.json(deletedProduct);
});

router.put("/produto/:id", Authenticate, async (request, response) => {
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
router.post("/sorteio", Authenticate, async (request, response) => {
  const { nome, descricao, quantidade_ganhadores, imagem } = request.body;
  response.json(
    await sorteioController.create(
      nome,
      descricao,
      quantidade_ganhadores,
      imagem
    )
  );
});
router.get("/sorteio", Authenticate, async (request, response) => {
  const { id } = request.params;
  response.json(await sorteioController.findAll(id));
});
router.get("/sorteio/:id", Authenticate, async (request, response) => {
  const { id } = request.params;
  response.json(await sorteioController.findOne(id));
});
router.delete("/sorteio/:id", Authenticate, async (request, response) => {
  const { id } = request.params;
  const deletedSorteio = await sorteioController.delete(id);
  response.json(deletedSorteio);
});

router.put("/sorteio/:id", Authenticate, async (request, response) => {
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
router.post("/sorteio/cliente", Authenticate, async (request, response) => {
  const { id_sorteio, id_cliente } = request.body;
  response.json(await sorteioClienteController.create(id_sorteio, id_cliente));
});

module.exports = router;
