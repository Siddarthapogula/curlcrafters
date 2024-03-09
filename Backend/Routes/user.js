const express = require("express");
const router = express.Router();
const {User, Folio} = require("../db");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const {jwtSecret} = require("../config")
const authenticateUser = require("../MiddleWares/authenticateUser")
const signUpBody = zod.object({
    username : zod.string(),
    email : zod.string(),
    password : zod.string().min(6),
})

router.post("/signup", async (req, res)=>{
    console.log("reached");
    const {success} = signUpBody.safeParse(req.body);
    
    if(!success){
        return res.status(411).json({
            result : "false",
            msg : "please enter min 6 char of password / correct inputs"
        })
    }

    const isUserExists = await User.findOne({email : req.body.email});
    if(isUserExists){
        return res.status(411).json({
            result : "false",
            msg : "email already exists please try another!"
        })
    }

    const user = await User.create({
        username : req.body.username,
        email : req.body.email,
        password : req.body.password
    })

    const userId = user._id;
  

    const token = jwt.sign({
        userId : user._id
    }, jwtSecret);

    res.json({
        result : "true",
        msg : "success",
        token
    })
})

const signInBody = zod.object({
    username : zod.string(),
    password : zod.string().min(6)
});

router.post("/signin", async (req, res)=>{
    const {success} = signInBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            result : "false",
            msg : "Invalid input format(password must be atleast 6 char)"
        })
    }
    const user = await User.findOne({
        username : req.body.username,
        password : req.body.password
    });
    if(user){
        const token = jwt.sign({userId : user._id}, jwtSecret);
        res.json({
            result : "true",
            msg : "successfully logged in",
            token
        })
        return;
    }
    return res.status(411).json({
        result : "false",
        msg : "No user found"
    })
})
const updateBody = zod.object({
    newpassword : zod.string().min(6)
})
router.put("/update", authenticateUser, async (req, res) => {
    const authorization = req.headers.authorization;
    const newPassword = req.body.newpassword;
    const { success } = updateBody.safeParse(req.body);
    
    if (!success) {
        return res.status(411).json({
            result : "false",
            msg: "enter valid input format"
        });
    }

    const decoded = jwt.verify(authorization, jwtSecret);
    const userId1 = decoded.userId;
    console.log(newPassword);
    try {

        const user = await User.findByIdAndUpdate(userId1, { password: newPassword });
        console.log(user);
        return res.json({
            result : "true ",
            msg: "password updated successfully"
        });
    } catch (err) {
        console.error(err);  
        return res.status(500).json({
            result : "false",
            msg: "no user found"
        });
    }
});

router.get("/", async (req, res)=>{
    const authorization = req.headers.authorization;
    const decoded = jwt.verify(authorization, jwtSecret);
    const userId1 = decoded.userId;
    console.log(userId1);
    const user = await User.findOne({_id : userId1});
    const userName = user.username;
    res.json({
        userName
    })
})

module.exports = router;