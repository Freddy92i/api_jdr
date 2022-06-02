const Sequelize = require('sequelize');

const MessageSchema = {
    // Model attributes are defined here
    message: {
        type: Sequelize.STRING,
        allowNull: false
    }
    
};

module.exports = { MessageSchema };