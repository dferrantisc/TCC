const router = require("express").Router();
const multer = require("multer");

const LoginController = require("./controllers/loginController");
const FuncionarioController = require("./controllers/funcionarioController");
const clienteController = require("./controllers/clienteController");
const categoriaController = require("./controllers/categoriaController");
const produtoController = require("./controllers/produtoController");
const sorteioController = require("./controllers/sorteioController");
const sorteioClienteController = require("./controllers/sorteioClienteController");
const Authenticate = require("./middlewares/Authenticate");
const funcionarioController = require("./controllers/funcionarioController");
const ganhadoresController = require("./controllers/ganhadoresController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    const fileType = file.mimetype.split("/");
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + fileType[1]);
  },
});

const upload = multer({ dest: "public/images", storage });

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

router.get("/funcionario", Authenticate, async (request, response) => {
  response.json(await funcionarioController.findAll());
});

router.delete("/funcionario/:id", Authenticate, async (request, response) => {
  const { id } = request.params;
  const deletedFuncionario = await funcionarioController.delete(id);
  response.json(deletedFuncionario);
});

router.put("/funcionario/:id", Authenticate, async (request, response) => {
  const { id } = request.params;
  const { nome, login, email, senha } = request.body;

  const updatedFuncionario = await funcionarioController.update(
    id,
    nome,
    login,
    email,
    senha
  );
  response.json(updatedFuncionario);
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
  console.log(request.body);
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
router.post(
  "/produto",
  upload.single("imagem"),
  Authenticate,
  async (request, response) => {
    const { nome, preco, idadm, idcatg } = request.body;

    response.json(
      await produtoController.create(
        nome,
        preco,
        idadm,
        idcatg,
        request.file.filename
      )
    );
  }
);

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

router.put(
  "/produto/:id",
  upload.single("imagem"),
  Authenticate,
  async (request, response) => {
    const { id } = request.params;
    const { nome, preco, idadm, idcatg, imagem } = request.body;

    file = request.file ? request.file.filename : imagem;

    const updatedProduct = await produtoController.update(
      id,
      nome,
      preco,
      idadm,
      idcatg,
      file
    );
    response.json(updatedProduct);
  }
);

//SORTEIO
router.post(
  "/sorteio",
  upload.single("imagem"),
  Authenticate,
  async (request, response) => {
    const { nome, descricao, quantidade_ganhadores, datainicio, datafim } =
      request.body;
    response.json(
      await sorteioController.create(
        nome,
        descricao,
        quantidade_ganhadores,
        datainicio,
        datafim,
        request.file.filename
      )
    );
  }
);
router.get("/sorteio", Authenticate, async (request, response) => {
  const { id } = request.params;
  response.json(await sorteioController.findAll(id));
});
router.get("/sorteio/:id", async (request, response) => {
  const { id } = request.params;
  response.json(await sorteioController.findOne(id));
});
router.delete("/sorteio/:id", Authenticate, async (request, response) => {
  const { id } = request.params;
  const deletedSorteio = await sorteioController.delete(id);
  response.json(deletedSorteio);
});

router.put(
  "/sorteio/:id",
  upload.single("imagem"),
  Authenticate,
  async (request, response) => {
    const { id } = request.params;
    const {
      nome,
      descricao,
      quantidade_ganhadores,
      imagem,
      datainicio,
      datafim,
    } = request.body;

    file = request.file ? request.file.filename : imagem;

    const updatedSorteios = await sorteioController.update(
      id,
      nome,
      descricao,
      quantidade_ganhadores,
      datainicio,
      datafim,
      file
    );
    response.json(updatedSorteios);
  }
);

//Validaçao do Cliente no Sorteio /sorteio/cliente/
router.post("/sorteio/cliente", async (request, response) => {
  const { id_sorteio, id_cliente } = request.body;
  response.json(await sorteioClienteController.create(id_sorteio, id_cliente));
});

router.get("/sorteio/:id/cliente", async (request, response) => {
  const { id } = request.params;
  response.json(await sorteioClienteController.findBySorteio(id));
});

// Realizar sorteio
router.post("/sorteio/:id/ganhadores", async (request, response) => {
  const { id } = request.params;
  response.json(await ganhadoresController.create(id));
});

router.get("/sorteio/:id/ganhadores", async (request, response) => {
  const { id } = request.params;
  response.json(await ganhadoresController.findAll(id));
});

module.exports = router;
