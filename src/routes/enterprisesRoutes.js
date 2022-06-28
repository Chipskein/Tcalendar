const {Router} = require("express");
const EnterpriseController = require("../controllers/enterprisesController");
const { isLogged ,isNotInEnterprise,isInEnterprise,verifyToken}=require('../utils/middlewares');
const router=Router();
router.get('/',verifyToken,isLogged,isNotInEnterprise,EnterpriseController.showCreateForm);
router.post('/',verifyToken,isLogged,isNotInEnterprise,EnterpriseController.createEnterprise);
router.post('/adduser',verifyToken,isLogged,isInEnterprise,EnterpriseController.addUserToEnterprise);
router.get('/home',verifyToken,isLogged,isInEnterprise,EnterpriseController.showHome);
module.exports=router;