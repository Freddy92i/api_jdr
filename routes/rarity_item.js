const express = require('express')

module.exports = function(models, log){

    const app = express();
    const setup = require('../controllers/rarity_item');
    const { create , edit , getAll , getById } = setup(models);

    app.post("/", create);
    app.put("/:id", edit);
    app.get("/", getAll);
    app.get("/:id", getById)

    return app;

}
