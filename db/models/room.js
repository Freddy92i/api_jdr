const Sequelize = require('sequelize');

const RoomSchema = {
    // Model attributes are defined here
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
    
};

module.exports = { RoomSchema };