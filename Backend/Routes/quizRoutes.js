const express = require('express');
const jwt = require('jsonwebtoken');
const { Question, User, Quiz } = require('../db'); // Assuming you have a User model in your db module
const router = express.Router();
const { jwtSecret } = require("../config"); // Extract the secret from your config

router.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find({});
    res.json({
      questions
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({
      error: 'Internal Server Error',
    });
  }
});

router.post('/getscore', async (req, res)=>{
  const { token } = req.body;
  console.log(req.body);
    const decoded = jwt.verify(token, jwtSecret);

    const quiz = await Quiz.findOne({ userId: decoded.userId });
    res.json({
      quiz
    })    
})

router.post('/submit', async (req, res) => {
  try {
    const { token, score } = req.body;

    const decoded = jwt.verify(token, jwtSecret);

    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let quiz = await Quiz.findOne({ userId: user._id });

    if (!quiz) {
      quiz = await Quiz.create({ userId: user._id, scores: [score] });
    } else {
      quiz.score.push(score);
      await quiz.save();
    }

    res.json({
      success: true,
      quiz,
    });
  } catch (error) {
    console.error('Error submitting quiz result:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
});

module.exports = router;
