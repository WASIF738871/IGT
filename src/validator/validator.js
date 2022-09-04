const mongoose = require('mongoose')

// empty validation
const isEmpty= async function (data){
    if (Object.keys(data)) return true;
    return false
}

// mongoose Id validation
const isValidId = async function (id){
    if (mongoose.Types.ObjectId.isValid(id)) return true;
    return false
}

// name validation
const isValidName = async function(name){
    if(typeof name == null && typeof name == undefined) return false;
    if(typeof name != "string") return false;
    return true;
}

// phone  validation
const isValidPhone = async function(phone){
    const pattern = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
    return pattern.test(phone);
}

// Email  validation
const isValidEmail = async function(email){
return /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email);
}

// password  validation
const isValidPassword = async function(Password){
   return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(Password)
}
//image validation
const isValidImg = (img) => {
    const reg = /image\/png|image\/jpeg|image\/jpg/;
    return reg.test(img)
}


module.exports ={isEmpty,isValidId,isValidName,isValidPhone,isValidEmail,isValidPassword,isValidImg}