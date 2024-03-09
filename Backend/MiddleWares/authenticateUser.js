const {jwtSecret} = require("../config");
const jwt = require("jsonwebtoken");
const {User} = require("../db")
async function authenticateUser(req, res, next){
    const authorization = req.headers.authorization;
    const oldPassword = req.headers.oldpassword;

    const decoded = jwt.verify(authorization, jwtSecret);
    const user = await User.findOne({
        _id : decoded.userId
    })
    if(user.password === oldPassword){
            next();
    }    
    else{
        res.status(411).json({
            msg : "something went wrong at authentication"
        })
    }
}

module.exports = authenticateUser;