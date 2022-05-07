const PlayerRepository = require('../repository/sequelize/PlayerRepository')

exports.getPlayer = (req, res, next) => {
    PlayerRepository.getPlayer().then(players => {
        res.status(200).json(players);
    }).catch(err => {
        console.log(err);
    });
}

exports.getPlayerById = (req, res, next) => {
    const playerId = req.params.playerId;
    PlayerRepository.getPlayerById(playerId).then(player => {
        if(!player){
            res.status(404).json({
                message: 'Player with id: ' + playerId + ' not found'
            })
        }   else {
            res.status(200).json(player)
        }
    })
}

exports.createPlayer = (req, res, next) =>{
    PlayerRepository.createPlayer(req.body).then(newPlayer => {
        res.status(201).json(newPlayer)
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err)
    })
}

exports.addPlayerToTeam = (req, res, next) =>{
    PlayerRepository.addPlayerToTeam(req.body).then(newPlayer => {
        res.status(201).json(newPlayer)
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err)
    })
}

exports.updatePlayerInfo = (req, res, next) =>{
    const playerId = req.params.playerId;
    PlayerRepository.updatePlayerInfo(playerId, req.body)
        .then(result => {
            res.status(200).json({message: 'Player updated !', player: result})
        }).catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.deletePlayer = (req, res, next) =>{
    const playerId = req.params.playerId;
    PlayerRepository.deletePlayer(playerId)
        .then(result => {
            res.status(200).json({message: 'Player deleted !', player: result})
        }).catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        })
}