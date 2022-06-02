const Sequelize = require('sequelize');

const TypeItemSchema = {
    // Model attributes are defined here
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    
};

module.exports = { TypeItemSchema };