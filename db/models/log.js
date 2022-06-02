const Sequelize = require('sequelize');

const LogSchema = {
    // Model attributes are defined here
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    event: {
        type: Sequelize.STRING,
        allowNull: false
    },
    infos: {
        type: Sequelize.STRING,
        allowNull: true
    }
    
};

module.exports = { LogSchema };