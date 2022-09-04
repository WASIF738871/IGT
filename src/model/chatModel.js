const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
   userId: {
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    trim:true
   },
   Mobile: {
      type: Number,
      trim: true
   },
   message: {
      type: String,
      trim: true
   }

}, { timestamps: true })

module.exports = mongoose.model('Chat', chatSchema);