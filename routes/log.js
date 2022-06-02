const express = require('express')

module.exports = function(models, log){

    const app = express();
    const setup = require('../controllers/log');
    const { afficherLog } = setup(models);

    app.get("/", afficherLog);

    return app;

}