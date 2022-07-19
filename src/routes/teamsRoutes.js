const {Router} = require("express");
const router=Router();
const TeamsController = require("../controllers/teamsController");
const {verifyToken,isInEnterprise}=require('../utils/middlewares');

//show create team
router.get('/',verifyToken,isInEnterprise,TeamsController.getCreateTeam);
router.post('/',verifyToken,isInEnterprise,TeamsController.createTeam);

router.get('/:id',verifyToken,isInEnterprise,/*isinteam*/TeamsController.getTeamSchedule);
router.get('/:id/participants',verifyToken,isInEnterprise,/*isinteam*/TeamsController.getPartiticapnts);

router.post('/:id/invite/',verifyToken,/*isTeamAdmin,*/TeamsController.inviteUserToTeam);
router.get('/:id/invite/accept',TeamsController.addUserToTeam);//token in query

module.exports=router;