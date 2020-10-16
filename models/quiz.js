const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const quizSchema = new Schema({
  title:{
    type: String,
    required: true
  },
  description:{
      type: String,
      required: true
  },
  totalQuestion:{
      type: Number,
      required: true
  },
  marks:{
      type:Number,
      required:true
  }
});


module.exports = mongoose.model('Quiz', quizSchema);