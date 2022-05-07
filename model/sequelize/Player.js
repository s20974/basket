const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');


const Player = sequelize.define('Player', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Required field"
            },
            len: {
                args: [3, 50],
                msg: "The field must be longer than 3 characters and shorter than 50"
            }
        }
    },

    surname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Required field"
            },
            len: {
                args: [3, 50],
                msg: "The field must be longer than 3 characters and shorter than 50"
            }
        }
    },

    phone: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Required field"
            },
            len: {
                args: [3, 50],
                msg: "The field must be longer than 3 characters and shorter than 50"
            }
        }
    },

    role: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = Player