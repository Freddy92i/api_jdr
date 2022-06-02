const Sequelize = require('sequelize');

const CharacterSchema = {
    // Model attributes are defined here
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    level: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    biography: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    melee_damage: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    remote_damage: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    defense: {
        type: Sequelize.INTEGER,
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
    },
    is_npc: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
};

module.exports = { CharacterSchema };