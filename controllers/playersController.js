const PlayerRepository = require('../repository/sequelize/PlayerRepository')
const TeamsRepository = require('../repository/sequelize/TeamRepository')
const PlayerTeam = require('../model/sequelize/PlayerTeam')

exports.showPlayersList = (req, res, next) => {
    PlayerRepository.getPlayer().then(players => {
        res.render('pages/players/players', {
            players: players,
            navLocation: 'players'
        })
    })
}

exports.updatePlayer = (req, res, next) =>{
    const playerId = req.params.playerId;
    const playerData = {...req.body}
    PlayerRepository.updatePlayerInfo(playerId, playerData)
        .then(result => {
            res.redirect('/players')
        }).catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            res.render('error', {message: err.message});
        })
}

exports.deletePlayer = (req, res, next) =>{
    const playerId = req.params.playerId;
    PlayerRepository.deletePlayer(playerId)
        .then(result => {
            res.redirect('/players')
        }).catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            res.render('error', {message: err.message});
        })
}

exports.createPlayer = (req, res, next) =>{
    const playerInfo = {...req.body}
    PlayerRepository.createPlayer(playerInfo).then(newPlayer => {
        res.redirect('/players')
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err)
    })
}

exports.getPlayerById = (req, res, next) => {
    const playerId = req.params.playerId;

    let playerInfo, allTeams
    
    PlayerRepository.getPlayerById(playerId).then(player => {
        playerInfo = player;
        return TeamsRepository.getTeams();
    }).then(teams => {
        allTeams = teams;
        res.render('pages/players/player_info', {
            player: playerInfo,
            allTeams: allTeams,
            navLocation: 'team_player'
        })
    })
}

exports.updatePlayerFromInfo = (req, res, next) =>{
    const playerId = req.params.playerId;
    const playerData = {...req.body}
    PlayerRepository.updatePlayerInfo(playerId, playerData)
        .then(result => {
            res.redirect('/players/info/'+playerId)
        }).catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            res.render('error', {message: err.message});
        })
}

exports.deletePlayerFromTeam = (req, res, next) =>{
    const teamId = req.params.teamId;
    const playerId = req.params.playerId;
    PlayerRepository.deletePlayerFromTeam(teamId, playerId)
        .then(result => {
            res.redirect('/players/info/' + playerId)
        }).catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            res.render('error', {message: err.message});
        })
}

function isIsUnique (playerId, teamId){
    return  PlayerTeam.findOne({
        where: {
            team_id: playerId,
            player_id: teamId
        }
    }).then(count => {
        if(count != 0){
            return false;
        }
        return true;
    })
}

exports.addPlayerToTeam = (req, res, next) =>{
    
    const isPlayerInTeam = function (playerId, teamId){
        return PlayerTeam.count({
            where: {
                team_id: teamId,
                player_id: playerId
            }
        }).then(player_teams => {
            console.log(player_teams)
            if(player_teams == 0){
                return true;
            }
            return false;
        })
    }
    const playerId = req.body.player_id;
    const data = {...req.body};
    const teamId = data.team_id

    isPlayerInTeam(playerId, teamId).then(isUnique => {
        if(isUnique){
            PlayerRepository.addPlayerToTeam(data).then(newPlayer => {
                res.redirect('/players/info/' + playerId)
            }).catch(err => {
                if(!err.statusCode){
                    err.statusCode = 500;
                }
                res.render('error', {message: err.message});
            })
        }   else{
            res.render('error', {message: req.__('player.errors.plintm')});
        }
    })


}
