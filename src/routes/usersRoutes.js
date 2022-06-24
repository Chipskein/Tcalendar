const {Router} = require("express");
const router=Router();
const { upload }=require('../config/multer');
const UserController = require("../controllers/usersController");

router.post('/',upload.single('image'),UserController.register);
router.post('/login',UserController.login);
router.get('/logoff',UserController.logoff);
router.patch('/',UserController.update);
router.get('/reset',UserController.resetPassword);
router.get('/active',UserController.activeUser);

module.exports=router;