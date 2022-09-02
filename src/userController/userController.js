const jwt = require("jsonwebtoken")
const userModel = require('../userModel/userModel')

const createUser = async function (req, res) {
    try {
        let userData = req.body;
        let createData = await userModel.create(userData);
        return res.status(201).send({ status: true, message: "you have been Registered successfully", yourDetails: createData })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const login = async function (req, res) {
    try {
        const userCredentials = req.body;
        let { Email, Password } = userCredentials
        let user = await userModel.findOne({ Email: Email, Password: Password })
        if (!user) {
            return res.status(400).send({ status: false, message: "Your credentials are Wrong" })
        }
        let token = jwt.sign(
            { userId: user._id.toString()},
            "wasif-IGT"
        )
        return res.status(200).send({ stauts: true, message: "You are successfully loggedin", Token: token })
    } catch (err) {
        return res.status(500).send({ status: true, message: err.message })
    }

}

const getOneUser = async function (req, res) {
    try {
        let userId = req.params.userId;
        if (userId != req.userId) {
            return res.status(403).send({ status: false, message: "User is not authourized for fetching all details of user" })
        }
        let userProfile = await userModel.findById(userId)
        return res.status(200).send({ status: true, message: "here is your Profile Detail", Profile: userProfile })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const getAllUser = async function (req, res) {
    try {
        let userId = req.params.userId;
        console.log(req.userId)
        if (userId != req.userId) {
            return res.status(403).send({ status: false, message: "User is not authourized for fetching all details of user" })
        }
        let userProfile = await userModel.find()
        return res.status(200).send({ status: true, message: "here is all user's Profile Detail", Profile: userProfile })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = {
    createUser,
    login,
    getOneUser,
    getAllUser
}