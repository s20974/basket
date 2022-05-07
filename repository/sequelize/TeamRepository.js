const Team = require('../../model/sequelize/Team')
const Player = require('../../model/sequelize/Player')
const PlayerTeam = require('../../model/sequelize/PlayerTeam')

exports.getTeams = () => {
    return Team.findAll();
}

exports.getTeamById = (teamId) => {
    return Team.findByPk(teamId,
        {
            include: [{
                model: PlayerTeam,
                as: 'team_player',
                include: [{
                    model: Player,
                    as: 'player'
                }]
            }]
        });
}

exports.createTeam = (newTeamData) =>{
    return Team.create({
        title: newTeamData.title,
        city: newTeamData.city,
        adress: newTeamData.adress,
        short_title: newTeamData.short_title
    })
}

exports.updateTeam = (teamId, teamData) => {
    return Team.update(teamData, {
        where: {_id: teamId}
    })
}

exports.deleteTeam = (teamId) => {
    return Team.destroy({
        where: {_id: teamId}
    })
}

exports.deletePlayerFromTeam = (teamId, playerId) => {
    return PlayerTeam.destroy({
        where: {
            team_id: teamId,
            player_id: playerId
        }
    })
}