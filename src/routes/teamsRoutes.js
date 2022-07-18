const {Router} = require("express");
const router=Router();
const TeamsController = require("../controllers/teamsController");
const {verifyToken,isInEnterprise}=require('../utils/middlewares');

//show create team
router.get('/',verifyToken,isInEnterprise,TeamsController.getCreateTeam);
router.post('/',verifyToken,isInEnterprise,TeamsController.createTeam);

router.get('/:id',verifyToken,isInEnterprise,/*isinteam*/TeamsController.getTeamSchedule);
router.get('/:id/participants',verifyToken,isInEnterprise,/*isinteam*/TeamsController.getPartiticapnts);
router.post('/invite/adduser',TeamsController.addUserToTeam);
router.get('/invite/:email',TeamsController.inviteUserToTeam);
//router.get('/invite/accepted/:token',TeamsController.);

module.exports=router;