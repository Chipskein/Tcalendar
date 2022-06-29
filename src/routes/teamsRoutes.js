const {Router} = require("express");
const router=Router();
const TeamsController = require("../controllers/teamsController");
const {verifyToken,isInEnterprise}=require('../utils/middlewares');

router.post('/',verifyToken,isInEnterprise,TeamsController.createTeam);

module.exports=router;