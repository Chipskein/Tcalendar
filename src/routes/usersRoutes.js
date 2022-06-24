const {Router} = require("express");
const router=Router();
const { upload }=require('../config/multer');
const UserController = require("../controllers/usersController");

//not logged
router.get('/login',UserController.showLogin);
router.get('/register',UserController.showRegister);

router.post('/register',upload.single('image'),UserController.register);
router.post('/login',UserController.login);

router.get('/reset',UserController.showResetPasswordForm);
router.get('/active',UserController.activeUser);

//logged
router.get('/home',UserController.showHome);
router.get('/logoff',UserController.logoff);
router.post('/update',upload.single('image'),UserController.update);


module.exports=router;