const { default: mongoose } = require('mongoose')
const mongoosem = require('mongoose')

const userSchema = new mongoosem.Schema({
   FirstName: {
      type: String,
      required: true,
      trim: true
   },
   LastName: {
      type: String,
      required: true,
      trim: true
   },
   Phone: {
      type: Number,
      required: true,
      unique: true,
      trim: true
   },
   Email: {
      type: String,
      required: true,
      unique: true,
      trim: true
   },
   Password: {
      type: String,
      required: true,
      trim: true
   },
   ConfirmPassword: {
      type: String,
      required: true,
      trim: true
   },
   ProfilePicture: String,
   Dob: String,
   Language: {
      type: [String],
      enum: ["Hindi", "English", "Urdu"]
   },
   Gender: {
      type: [String],
      enum: ["Male", "Female", "Other"]
   }


}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)