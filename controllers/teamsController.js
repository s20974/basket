const TeamsRepository = require('../repository/sequelize/TeamRepository')

exports.showTeamsList = (req, res, next) => {
    TeamsRepository.getTeams().then(teams => {
        res.render('pages/teams/teams', {
            teams: teams,
            navLocation: 'teams'
        })
    })
}

exports.getTeamById = (req, res, next) => {
    const teamId = req.params.teamId;
    TeamsRepository.getTeamById(teamId).then(team => {
        res.render('pages/teams/team_info', {
            team: team,
            navLocation: 'team'
        })
    })
}

exports.updateTeam = (req, res, next) =>{
    const teamId = req.params.teamId;
    const teamInfo = {...req.body}
    console.log(teamInfo)
    TeamsRepository.updateTeam(teamId, teamInfo)
        .then(result => {
            res.redirect('/teams')
        }).catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            res.render('error', {message: err.message});
        })
}


exports.updateTeamFromInfo = (req, res, next) =>{
    const teamId = req.params.teamId;
    const teamInfo = {...req.body}
    console.log(teamInfo)
    TeamsRepository.updateTeam(teamId, teamInfo)
        .then(result => {
            res.redirect('/teams/info/'+teamId)
        }).catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            res.render('error', {message: err.message});
        })
}


exports.deleteTeam = (req, res, next) =>{
    const teamId = req.params.teamId;
    TeamsRepository.deleteTeam(teamId)
        .then(result => {
            res.redirect('/teams')
        }).catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            res.render('error', {message: err.message});
        })
}

exports.createTeam = (req, res, next) =>{
    const teamInfo = {...req.body}
    TeamsRepository.createTeam(teamInfo).then(newTeam => {
        res.redirect('/teams')
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        res.render('error', {message: err.message});
    })
}

exports.showTeamInfo = (req, res, next) => {
    res.render('pages/teams/team_info', {})
}

exports.deletePlayerFromTeam = (req, res, next) =>{
    const teamId = req.params.teamId;
    const playerId = req.params.playerId;
    TeamsRepository.deletePlayerFromTeam(teamId, playerId)
        .then(result => {
            res.redirect('/teams/info/'+teamId)
        }).catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            res.render('error', {message: err.message});
        })
}