const { default: mongoose } = require('mongoose')
const mongoosem = require('mongoose')

const userSchema = new mongoosem.Schema({
   " First Name":{
    type: String,
    required: true,
    trim: true
   },
   " Last Name":{
    type: String,
    required: true,
    trim: true
   } ,
   Phone :{
    type:Number,
    required: true,
    unique: true,
    trim :true
   },
   Email:{
    type: String,
    required: true,
    unique: true,
    trim :true
   },
   Password:{
    type:String,
    required: true,
    trim:true
   },
   "Confirm Password":{
    type:String,
    required: true,
    trim:true
   },
   "Profile Picture" : String,
   Dob:String,
   Language: {
    type:[String],
    enum:["Hindi","English","Urdu"]
   },
   Gender: {
    type:[String],
    enum:["Male", "Female", "Other"]
   }


},{timestamps:true})

module.exports = mongoose.model('User',userSchema)