const {Router} = require("express");
const controller = require("../controllers/enterprises_usersController");
const { isLogged ,isInEnterPrise,isOwner}=require('../utils/middlewares');
const router=Router();
router.post('/',isLogged,isInEnterPrise,controller.addUser);
module.exports=router;