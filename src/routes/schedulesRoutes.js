const {Router} = require("express");
const SchduleController = require("../controllers/schedulesController");
const router=Router();
router.get('/',SchduleController.list);
router.post('/',SchduleController.create);
module.exports=router;