const express = require('express')

module.exports = function(models, log){

    const app = express();
    const setup = require('../controllers/room');
    const { create , getAll } = setup(models,log);
    // app.get('', (req, res)=> res.send('session')); 

    app.post("/", create);
    // app.put("/:id", edit);
    app.get("/", getAll);
    // app.get("/:id", getById)

    return app;

}
