const {Router} = require("express");
const EnterpriseController = require("../controllers/enterprisesController");
const { isLogged ,isNotInEnterprise,isInEnterprise}=require('../utils/middlewares');
const router=Router();
router.get('/',isLogged,isNotInEnterprise,EnterpriseController.showCreateForm);
router.post('/',isLogged,isNotInEnterprise,EnterpriseController.createEnterprise);

router.get('/home',isLogged,isInEnterprise,EnterpriseController.showHome);
module.exports=router;