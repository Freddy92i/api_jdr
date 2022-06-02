const express = require('express')

module.exports = function(models, log){

    const app = express();
    const setup = require('../controllers/room_character');
    const { create , getAllById} = setup(models,log);
    // app.get('', (req, res)=> res.send('session')); 

    app.post("/", create);
    // app.put("/:id", edit);
    // app.get("/", getAll);
    app.get("/:id", getAllById)

    return app;

}
