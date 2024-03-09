const mongoose = require("mongoose");
const {config} = require("dotenv");
config();
mongoose.connect(process.env.DATABASE_CONNECTION);

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});
const quizSchema = new mongoose.Schema({
    userId: 
    { 
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User'
     },
    score: { 
        type: Number, 
        required: true
     },
  });

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  choices: {
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
});

const Question = mongoose.model('Question', questionSchema);
  
const Quiz = mongoose.model('Quiz', quizSchema);

const User = mongoose.model("User", UserSchema);


module.exports = {
    User,
    Quiz,
    Question
};


