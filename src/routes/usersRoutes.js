const {Router} = require("express");
const router=Router();
const { upload }=require('../config/multer');
const UserController = require("../controllers/usersController");

router.post('/',upload.single('image'),UserController.register);
router.post('/login',UserController.login);

module.exports=router;