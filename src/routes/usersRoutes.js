const {Router} = require("express");
const router=Router();
const { Users } = require('../models/usersModel')
router.get('/',(req,res)=>{return res.send('TESTANDo')});
module.exports=router;