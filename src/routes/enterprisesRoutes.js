const {Router} = require("express");
const EnterpriseController = require("../controllers/enterprisesController");
const { isLogged ,isNotInEnterPrise,isInEnterPrise}=require('../utils/middlewares');
const router=Router();
router.get('/',isLogged,isNotInEnterPrise,EnterpriseController.showCreateForm);
router.post('/',isLogged,isNotInEnterPrise,EnterpriseController.createEnterprise);

router.get('/home',isLogged,isInEnterPrise,EnterpriseController.showHome);
module.exports=router;