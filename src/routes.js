const router = require("express").Router();
const ProprietariofunciController = require("./controllers/ProprietorifunciController");
router.post("/login", async(request, response) => {
    const login = request.body.login;
    const senha = request.body.senha;
    response.send(await ProprietariofunciController.login(login, senha));
});

/*router.get("/test", (request, response) => {
    response.send("Logado!");
});*/

module.exports = router;