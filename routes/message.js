const express = require('express')

module.exports = function(models, log){

    const app = express();
    const setup = require('../controllers/message');
    const { create , edit , getAll , getById } = setup(models);
    app.get('', (req, res)=> res.send('message')); 

    app.post("/", create);
    app.get("/", getAll);
    app.get("/:id", getById)

    return app;

}
