const {Router} = require("express");
const controller = require("../controllers/enterprises_usersController");
const { isLogged ,isInEnterprise,isOwner}=require('../utils/middlewares');
const router=Router();
router.post('/',isLogged,isInEnterprise,controller.addUser);
module.exports=router;