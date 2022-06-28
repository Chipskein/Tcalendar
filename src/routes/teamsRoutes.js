const {Router} = require("express");
const router=Router();
router.get('/',(req,res)=>{return res.send('TESTANDo')});
module.exports=router;