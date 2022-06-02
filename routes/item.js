const express = require('express')

module.exports = function(models, log){

    const app = express();
    const setup = require('../controllers/item');
    const { create , edit , getAll , getById } = setup(models, log);

    app.post("/", create);
    app.post("/:id", edit);
    app.get("/", getAll);
    app.get("/:id", getById)

    return app;

}
