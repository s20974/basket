const Team = require('../../model/sequelize/Team')
const Player = require('../../model/sequelize/Player')
const PlayerTeam = require('../../model/sequelize/PlayerTeam')

const authUtil = require('../../util/authUtils');

exports.getPlayer = () => {
    return Player.findAll( 
    {
        include:[{
            model: PlayerTeam,
            as: 'team_player',
            include: [{
                model: Team,
                as: 'team',
            }]
        }]
    })
}

exports.isPlayerInTeam = (playerId, teamId) => {
    return PlayerTeam.findOne({
        where: {
            player_id: playerId,
            team_id: teamId
        }
    })
}

exports.getPlayerById = (playerId) => {
    return Player.findByPk(playerId, 
        { 
            include:[{
                model: PlayerTeam,
                as: 'team_player',
                include: [{
                    model: Team,
                    as: 'team',
                }]
            }]
        });
}

exports.createPlayer = (playerData) => {
    const password = authUtil.hashPassword(playerData.password)
    return Player.create({
        name: playerData.name,
        surname: playerData.surname,
        phone: playerData.phone,
        password: password
    })
}

exports.addPlayerToTeam = (data) => {
    return PlayerTeam.create({
        salary: data.salary,
        player_number: data.player_number,
        days_in_team: data.days_in_team,
        team_id: data.team_id,
        player_id: data.player_id,
    })
}

exports.updatePlayerInfo = (playerId, data) => {
    return Player.update(data, {where: {_id: playerId}})
}

exports.deletePlayer = (playerId) => {
    return Player.destroy({
        where: {_id: playerId}
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

exports.findByPhone = (phone) => {
    return Player.findOne({
        where: {phone: phone}
    })
}