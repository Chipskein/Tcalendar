const {Router} = require("express");
const EnterpriseController = require("../controllers/enterprisesController");
const { isLogged ,isNotInEnterPrise}=require('../utils/middlewares');
const router=Router();
router.get('/',isLogged,isNotInEnterPrise,EnterpriseController.showCreateForm);
router.post('/',isLogged,isNotInEnterPrise,EnterpriseController.createEnterprise);
module.exports=router;