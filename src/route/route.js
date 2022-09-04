const express = require('express');
const userController = require('../controller/userController');
const chatController =require('../controller/chatController');
const middleware = require('../middleware/auth');
let router = express.Router();

router.post('/register',userController.createUser);
router.post('/login',userController.login);

router.post('/chatSend/:userId',middleware.authentication,chatController.chatSend);

router.get('/user/:userId',middleware.authentication,userController.getOneUser);
router.get('/allUser/:userId',middleware.authentication,userController.getAllUser);

module.exports = router;
