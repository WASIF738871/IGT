const express = require('express')
const userController = require('../userController/userController')
const middleware = require('../middleware/auth')
let router = express.Router();

router.post('/register',userController.createUser);
router.post('/login',userController.login)
router.get('/user/:userId',middleware.authentication,userController.getOneUser)
router.get('/allUser/:userId',middleware.authentication,userController.getAllUser)

module.exports = router;
