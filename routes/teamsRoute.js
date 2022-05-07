var express = require('express');
var router = express.Router();

const teams = require('../controllers/teamsController')

router.get('/', teams.showTeamsList)
router.get('/info/:teamId', teams.getTeamById)
router.post('/update/:teamId', teams.updateTeam)
router.get('/delete/:teamId', teams.deleteTeam)
router.post('/info/update/:teamId', teams.updateTeamFromInfo)
router.post('/add', teams.createTeam)
router.get('/player/delete/:teamId/:playerId', teams.deletePlayerFromTeam)


module.exports = router;