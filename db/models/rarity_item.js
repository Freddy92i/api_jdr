const Sequelize = require('sequelize');

const RarityItemSchema = {
    // Model attributes are defined here
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nbMax: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
    
};

module.exports = { RarityItemSchema };