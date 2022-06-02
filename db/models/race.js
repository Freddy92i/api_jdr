const Sequelize = require('sequelize');

const RaceSchema = {
    // Model attributes are defined here
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    life_point: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    strength: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    agility: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    intelligence: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    initiative: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    social: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
    
};

module.exports = { RaceSchema };