const {Router} = require("express");
const EnterpriseController = require("../controllers/enterprisesController");
const { isLogged ,isNotInEnterprise,isInEnterprise,isEnterpriseOwner,verifyToken}=require('../utils/middlewares');
const router=Router();

router.get('/',verifyToken,isLogged,isNotInEnterprise,EnterpriseController.showCreateForm);
router.get('/home/:id',verifyToken,isLogged,isInEnterprise,EnterpriseController.showHome);
router.post('/',verifyToken,isLogged,isNotInEnterprise,EnterpriseController.createEnterprise);
router.post('/update',verifyToken,isLogged,isInEnterprise,isEnterpriseOwner,EnterpriseController.updateEnterprise);
router.post('/adduser',verifyToken,isLogged,isInEnterprise,isEnterpriseOwner,EnterpriseController.addUserToEnterprise);
router.get('/home',verifyToken,isLogged,isInEnterprise,EnterpriseController.showHome);

module.exports=router;