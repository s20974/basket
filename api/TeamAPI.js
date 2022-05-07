const TeamRepository = require('../repository/sequelize/TeamRepository')

exports.getTeam = (req, res, next) => {
    TeamRepository.getTeams().then(team => {
        res.status(200).json(team);
    }).catch(err => {
        console.log(err);
    });
}

exports.getTeamById = (req, res, next) => {
    const teamId = req.params.teamId;
    TeamRepository.getTeamById(teamId).then(team => {
        if(!team){
            res.status(404).json({
                message: 'Team with id: ' + teamId + ' not found'
            })
        }   else {
            res.status(200).json(team)
        }
    })
}

exports.createTeam = (req, res, next) => {
    TeamRepository.createTeam(req.body).then(newTeam => {
        res.status(201).json(newTeam)
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err)
    })
}

exports.updateTeam = (req, res, next) =>{
    const teamId = req.params.teamId;
    TeamRepository.updateTeam(teamId, req.body)
        .then(result => {
            res.status(200).json({message: 'Team updated !', team: result})
        }).catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.deleteTeam = (req, res, next) =>{
    const teamId = req.params.teamId;
    TeamRepository.deleteTeam(teamId)
        .then(result => {
            res.status(200).json({message: 'Team deleted !', player: result})
        }).catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.deletePlayerFromTeam = (req, res, next) =>{
    const teamId = req.params.teamId;
    const playerId = req.params.playerId;
    TeamRepository.deletePlayerFromTeam(teamId, playerId)
        .then(result => {
            res.status(200).json({message: 'Player deleted from Team !', player: result})
        }).catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        })
}