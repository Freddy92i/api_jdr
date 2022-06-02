const Sequelize = require('sequelize');

const SkillSchema = {
    // Model attributes are defined here
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    stat: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    
};

module.exports = { SkillSchema };