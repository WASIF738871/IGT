const jwt = require("jsonwebtoken");
const chatModel = require("../model/chatModel");
const userModel = require('../model/userModel');
const aws1 = require("../aws/aws.js");
const { isEmpty, isValidId, isValidName, isValidPhone, isValidEmail, isValidPassword,isValidImg } = require('../validator/validator')

const createUser = async function (req, res) {
    try {
        let userData = req.body;
        let { FirstName, LastName, Phone, Email, Password, ConfirmPassword, Language, Gender } = userData
        if (!isEmpty(userData)) {
            return res.status(400).send({ status: false, message: "please fill required fields" })
        }
        if (!FirstName) {
            return res.status(400).send({ status: false, message: "please fill FirstName " })
        }
        if (!isValidName(FirstName)) {
            return res.status(400).send({ status: false, message: "please fill FirstName in correct format" })
        }
        if (!LastName) {
            return res.status(400).send({ status: false, message: "please fill LastName " })
        }
        if (!isValidName(LastName)) {
            return res.status(400).send({ status: false, message: "please fill LastName in correct format" })
        }
        if (!Phone) {
            return res.status(400).send({ status: false, message: "please fill Phone No" })
        }
        if (!isValidPhone(Phone)) {
            return res.status(400).send({ status: false, message: "please fill Phone No in correct format" })
        }
        if (!Email) {
            return res.status(400).send({ status: false, message: "please fill Email address" })
        }
        if (!isValidEmail(Email)) {
            return res.status(400).send({ status: false, message: "please fill Email in correct format" })
        }

        let checkUnique = await userModel.findOne({ $or: [{ Phone: Phone }, { Email: Email }] })
        if (checkUnique) {
            return res.status(400).send({ status: false, message: "This Phone/Email is already registered " })
        }
        if (!Password) {
            return res.status(400).send({ status: false, message: "please fill Password" })
        }
        if (!isValidPassword(Password)) {
            return res.status(400).send({ status: false, message: "Password should have atleast 1 UpperCase, 1Lowercase, 1 Digit, 1special character" })
        }
        if (!ConfirmPassword) {
            return res.status(400).send({ status: false, message: "please Confirm your Password" })
        }
        if (Password != ConfirmPassword) {
            return res.status(400).send({ status: false, message: "Password doesn't match" })
        }
        if (Language.length == 0) {
            return res.status(400).send({ status: false, message: "please fill Language" })
        }
        if (Gender.length == 0) {
            return res.status(400).send({ status: false, message: "please fill Gender" })
        }
        if (Gender != ("Male" || "Female" || "Other")) {
            return res.status(400).send({ status: false, message: "please fill Gender Male/Female/Other " })
        }

        let file = req.files;
        if (file.length == 0) {
            return res.status(400).send({ status: false, message: "Please Provide The Profile Picture" })
        }
        if (file && file.length > 0) {
            if (!isValidImg(file[0].mimetype)) {
                return res.status(400).send({ status: false, message: "Image Should be of JPEG/ JPG/ PNG" });
            }

            let newurl = await aws1.uploadFile(file[0]);
            userData["ProfilePicture"] = newurl;
        }

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
        if (!isEmpty(userCredentials)) {
            return res.status(400).send({ status: false, message: "please fill required fields" })
        }
        if (!Email) {
            return res.status(400).send({ status: false, message: "Please enter Email" })
        }
        if (!Password) {
            return res.status(400).send({ status: false, message: "Please enter Password" })
        }
        let user = await userModel.findOne({ Email: Email, Password: Password })
        if (!user) {
            return res.status(400).send({ status: false, message: "Your credentials are Wrong" })
        }
        let token = jwt.sign(
            { userId: user._id.toString() },
            "wasif-IGT"
        )
        obj = {
            userId: user._id,
            token: token
        }
        return res.status(200).send({ stauts: true, message: "You are successfully loggedin", data: obj })
    } catch (err) {
        return res.status(500).send({ status: true, message: err.message })
    }

}

const getOneUser = async function (req, res) {
    try {
        let userId = req.params.userId;
        if (!isValidId(userId)) {
            return res.status(400).send({ status: false, message: "Invalid User id" })
        }
        if (userId != req.userId) {
            return res.status(403).send({ status: false, message: "User is not authourized for fetching all details of user" })
        }
        let userProfile = await userModel.findById(userId)
        if (!userProfile) {
            return res.status(400).send({ status: false, message: "no User found" })
        }
        return res.status(200).send({ status: true, message: "here is your Profile Detail", Profile: userProfile })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}
/// admin API
const getAllUser = async function (req, res) {
    try {
        let userId = req.params.userId;
        if (!isValidId(userId)) {
            return res.status(400).send({ status: false, message: "Invalid User id" })
        }
        if (userId != req.userId) {
            return res.status(403).send({ status: false, message: "User is not authourized for fetching all details of user" })
        }
        let userProfile = await userModel.findById(userId)
        if (!userProfile) {
            return res.status(400).send({ stauts: false, message: "No data found" })
        }
        let chatHistory = await chatModel.find({ userId })
        if (chatHistory.length == 0) {
            let message = "chatHistory is Empty"
            chatHistory = message;
        }
        let fullDetail = {
            userProfile: userProfile,
            chatHistory: chatHistory
        }
        return res.status(200).send({ status: true, message: "here is all user's Profile Detail", Profile: fullDetail })
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