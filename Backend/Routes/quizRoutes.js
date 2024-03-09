const express = require('express');
const { Question } = require('../db');
const router = express.Router();

router.get('/questions', async (req, res) => {
    const questions = await Question.find({});
    console.log(questions);
    res.json({
        questions
    })
});

router.post('/submit',  async (req, res) => {
    console.log("at submit")
    res.json({
        msg : "success"
    })
});

module.exports = router;