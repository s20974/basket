const sequelize = require('./sequelize')

const Team = require('../../model/sequelize/Team')
const Player = require('../../model/sequelize/Player')
const PlayerTeam = require('../../model/sequelize/PlayerTeam')

const authUtil = require('../../util/authUtils');
const passHash = authUtil.hashPassword('12345');

module.exports = () => {
    Team.hasMany(PlayerTeam, {as: 'team_player', 
                                foreignKey: {name: 'team_id', allowNull: false}, 
                                constraints: true});
    PlayerTeam.belongsTo(Team, {as: 'team', 
                                  foreignKey: {name: 'team_id', 
                                  allowNull: false}});

    Player.hasMany(PlayerTeam, {as: 'team_player', 
                                  foreignKey: {name: 'player_id', allowNull: false}, 
                                  constraints: true})
    PlayerTeam.belongsTo(Player, {as: 'player', 
                                    foreignKey: {name: 'player_id', 
                                    allowNull: false}})

    let allTeams, allPlayers
    return sequelize
        .sync({force: true})
        .then(() => {
            return Team.findAll();
        })
        .then(teams => {
            if(!teams || teams.length == 0){
                return Team.bulkCreate([
                    {title: 'Los-Angeles Lakers', city: 'Los-Angeles', adress: 'los-1', short_title: 'LAL'},
                    {title: 'Chicago Bulls', city: 'Chicago', adress: 'chi-1', short_title: 'CHI'}
                ]).then(() => {
                    return Team.findAll();
                })
            }   else {
                return teams;
            }
        }).then(teams => {
            allTeams = teams;
            return Player.findAll();
        }).then(players => {
            if(!players || players.length == 0){
                return Player.bulkCreate([
                    {name: 'Admin', surname: 'Admin', phone: '+38095', password: authUtil.hashPassword('12345678'), role: 'admin'},
                    {name: 'LeBron', surname: 'James', phone: '10984893', password: passHash, role: 'player'},
                    {name: 'Russell', surname: 'Westbrook', phone: '19978433', password: passHash, role: 'player'},
                    {name: 'Dwane', surname: 'Wade', phone: '9876543', password: passHash, role: 'player'},
                    {name: 'Michael', surname: 'Jordan', phone: '9876543', password: passHash, role: 'player'}
                ]).then(() => {
                    return Player.findAll();
                })
            }  else {
                return players;
            }
        }).then(players => {
            allPlayers = players;
            return PlayerTeam.findAll();
        }).then(tm_pl => {
            if(!tm_pl || tm_pl.length == 0){
                return PlayerTeam.bulkCreate([
                    {team_id: allTeams[0]._id, player_id: allPlayers[0]._id, salary: 1000000.0, player_number: 6, days_in_team: 900},
                    {team_id: allTeams[1]._id, player_id: allPlayers[1]._id, salary: 900000.0, player_number: 3, days_in_team: 456}
                ])
            }   else {
                return tm_pl;
            }
        })
}