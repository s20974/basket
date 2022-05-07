const express = require('express')
const router = express.Router();

const teamApiController = require('../../api/TeamAPI')

router.get('/', teamApiController.getTeam)
router.get('/:teamId', teamApiController.getTeamById)
router.post('/', teamApiController.createTeam)
router.put('/:teamId', teamApiController.updateTeam)
router.delete('/:teamId', teamApiController.deleteTeam)
router.delete('/:teamId/:playerId', teamApiController.deletePlayerFromTeam)


module.exports = router