const express = require('express')

module.exports = function (models, log) {
    const app = express();
    const setup = require('../controllers/race');
    const { create, edit, getAll, getById } = setup(models, log);
    // app.get('', (req, res)=> res.send('race')); 

    // CRUD classique norme REST
    // =========================
    //
    // POST /races : créer une race
    // PUT /races/:id : mettre à jour une race par ID
    // GET /races : lister toutes les races
    // GET /races/:id : récupérer une seule race par ID
    // DELETE / races/:id : supprimer une race (enfoiré d'hybriiiiiiiiiide)

    app.post("/", create);
    app.put("/:id", edit);
    app.get("/", getAll);
    app.get("/:id", getById)

    return app;

}