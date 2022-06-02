const express = require('express')

module.exports = function(models, log) {
    const app = express();

    const setup = require('../controllers/user')

    const { getUser, getAll, getById } = setup(models);
    
    
    app.get("/me", getUser);
    app.get("", getAll);
    app.get("/:id", getById)

    return app;
}