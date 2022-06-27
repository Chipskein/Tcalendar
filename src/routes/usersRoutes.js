const {Router} = require("express");
const router=Router();
const { upload }=require('../config/multer');
const {isLogged,isNotLogged,verifyToken,verifyHasNoToken}=require('../utils/middlewares');
const UserController = require("../controllers/usersController");

//not logged
router.get('/login',verifyHasNoToken,isNotLogged,UserController.showLogin);
router.get('/register',verifyHasNoToken,isNotLogged,UserController.showRegister);

router.post('/register',verifyHasNoToken,isNotLogged,upload.single('image'),UserController.register);
router.post('/login',verifyHasNoToken,isNotLogged,UserController.login);

router.get('/forget',verifyHasNoToken,isNotLogged,UserController.showForgetMyPasswordForm);
router.post('/forget',verifyHasNoToken,isNotLogged,UserController.forgetMyPasswordForm);
router.get('/resetpassword',verifyHasNoToken,isNotLogged,UserController.showResetPasswordForm);
router.get('/active',verifyHasNoToken,isNotLogged,UserController.activeUser);

//logged
router.get('/home',verifyToken,isLogged,UserController.showHome);
router.get('/logoff',verifyToken,isLogged,UserController.logoff);
router.post('/update',verifyToken,isLogged,upload.single('image'),UserController.update);


module.exports=router;