const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  title:{
    type: String,
    required: true
  },
  options:[{
    op1:{
     type:String,
     required:true
    },
    op2:{
      type:String,
      required:true
     },
     op3:{
      type:String,
      required:true
     },
     op4:{
      type:String,
      required:true
     }
  }],
  answer:{
    type:String,
    required:true
  },
  quizId:{
    type:Schema.Types.ObjectId,
    required:true,
    ref:'Quiz'
  }
  
});


module.exports = mongoose.model('Questions', questionSchema);