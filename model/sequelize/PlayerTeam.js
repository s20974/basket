const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');


const PlayerTeam = sequelize.define('PlayerTeam', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },

    player_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    days_in_team: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },

    salary: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
    },

    team_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    player_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

module.exports = PlayerTeam