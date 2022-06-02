const Sequelize = require('sequelize');

const SessionSchema = {
    // Model attributes are defined here
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
    
};

module.exports = { SessionSchema };