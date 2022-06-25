const {Router} = require("express");
const router=Router();
const { upload }=require('../config/multer');
const {isLogged,isNotLogged}=require('../utils/middlewares');
const UserController = require("../controllers/usersController");

//not logged
router.get('/login',isNotLogged,UserController.showLogin);
router.get('/register',isNotLogged,UserController.showRegister);

router.post('/register',isNotLogged,upload.single('image'),UserController.register);
router.post('/login',isNotLogged,UserController.login);

router.get('/forget',isNotLogged,UserController.showForgetMyPasswordForm);
router.post('/forget',isNotLogged,UserController.forgetMyPasswordForm);
router.get('/resetpassword',isNotLogged,UserController.showResetPasswordForm);
router.get('/active',isNotLogged,UserController.activeUser);

//logged
router.get('/home',isLogged,UserController.showHome);
router.get('/logoff',isLogged,UserController.logoff);
router.post('/update',isLogged,upload.single('image'),UserController.update);


module.exports=router;