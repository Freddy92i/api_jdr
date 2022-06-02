const express = require('express')

module.exports = function(models, log) {
    const app = express();

    const setup = require('../controllers/auth')

    const { signup, login, getToken, getUser, logout , getAll } = setup(models, log);
    
    app.post("/signup", signup);
    app.post("/login", login);
    app.post("/logout", logout);
    app.get("/token", getToken);
    

    return app;
}