var express = require('express');
var router = express.Router();

const players = require('../controllers/playersController')
const authUtil = require('../util/authUtils');


router.get('/', players.showPlayersList)
router.post('/update/:playerId', authUtil.premitAuthenticatedUser, players.updatePlayer)
router.get('/delete/:playerId', authUtil.premitAuthenticatedUser, players.deletePlayer)
router.post('/add', authUtil.premitAuthenticatedUser, players.createPlayer)
router.get('/info/:playerId', players.getPlayerById)
router.post('/info/update/:playerId', authUtil.premitAuthenticatedUser, players.updatePlayerFromInfo)
router.get('/team/delete/:teamId/:playerId', authUtil.premitAuthenticatedUser, players.deletePlayerFromTeam)
router.post('/team/add', authUtil.premitAuthenticatedUser, players.addPlayerToTeam)

module.exports = router;