const express = require('express')
const router = express.Router();

const playerApiController = require('../../api/PlayerAPI')
const isAuth = require('../../middleware/isAuth')

router.get('/', playerApiController.getPlayer)
router.get('/:playerId', playerApiController.getPlayerById)
router.post('/', playerApiController.addPlayerToTeam)
router.post('/add', playerApiController.createPlayer)
router.put('/:playerId', playerApiController.updatePlayerInfo)
router.delete('/:playerId', isAuth, playerApiController.deletePlayer)


module.exports = router