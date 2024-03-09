const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const quizRouter = require("./quizRoutes");

router.use("/user", userRouter);
router.use("/quiz", quizRouter );
module.exports = router;
