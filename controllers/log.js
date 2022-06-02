const { DataTypes: { INTEGER } } = require("sequelize");

module.exports = function({ Log }) {
    var afficherLog = async (req, res, next) => {
        const log = await Log.findAll();
          res.json(log);
        
    }

    return {
        afficherLog

    }
}