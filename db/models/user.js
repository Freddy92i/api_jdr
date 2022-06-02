const Sequelize = require('sequelize');


const UserSchema = {
    // Model attributes are defined here
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    firstname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    admin: {
        type: Sequelize.BOOLEAN
        // allowNull defaults to true
    }
};

module.exports = { UserSchema };