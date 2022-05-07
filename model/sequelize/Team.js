const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');


const Team = sequelize.define('Team', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    title: {
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

    city: {
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

    adress: {
        type: Sequelize.STRING,
        allowNull: true,
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

    short_title: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            notEmpty: {
                msg: "Required field"
            },
            len: {
                args: [3, 3],
                msg: "The field must be 3 characters length"
            }
        }
    }
});

module.exports = Team