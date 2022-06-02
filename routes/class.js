const express = require('express')

module.exports = function(models, log){

    const app = express();
    const setup = require('../controllers/class');
    const { create , edit , getAll , getById } = setup(models, log);
    // app.get('', (req, res)=> res.send('class')); 

    app.post("/", create);
    app.put("/:id", edit);
    app.get("/", getAll);
    app.get("/:id", getById)

    return app;

}
