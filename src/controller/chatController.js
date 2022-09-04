const chatModel = require('../model/chatModel');
const userModel = require('../model/userModel')
const {isEmpty,isValidId}= require('../validator/validator')


const chatSend = async function (req, res) {
    try {
        let chatData = req.body;
        let{userId,Mobile} =chatData;
        let senderId = req.params.userId
        if(!isEmpty(chatData)){
            return res.status(400).send({ status: false, message: "please fill required fields" })
        }
        if (!isValidId(userId)) {
            return res.status(400).send({ status: false, message: "Invalid User id" })
        }
        if (senderId != req.userId) {
            return res.status(403).send({ status: false, message: "Sender is not authorized" })
        }
        let userProfile = await userModel.findById(userId)
        if (!userProfile) {
            return res.status(400).send({ status: false, message: "no reciever found" })
        }
        let mobile = await userModel.findOne({Mobile:Mobile})
        if (!mobile) {
            return res.status(400).send({ status: false, message: "no mobile found to send message" })
        }
        
        if (!isValidId(senderId)) {
            return res.status(400).send({ status: false, message: "Invalid senderId " })
        }
        let senderProfile = await userModel.findById(senderId)
        if (!senderProfile) {
            return res.status(400).send({ status: false, message: "no senderProfile found" })
        }
        let sendData = await chatModel.create(chatData);
        return res.status(201).send({ status:true, chat: sendData })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = {
    chatSend
}