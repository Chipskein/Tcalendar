const {Router} = require("express");
const router=Router();

const UserController = require("../controllers/usersController");

router.post('/',UserController.register);
router.post('/register',UserController.login);

module.exports=router;