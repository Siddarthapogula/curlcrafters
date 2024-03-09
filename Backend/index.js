const express = require("express");
const cors = require("cors")
const port = 3000;
const app = express();
const rootRouter = require("./Routes/index")

app.use(express.json());
app.use(cors());
app.use("/", rootRouter);


app.use((err, req, res, next)=>{
    const body = 
    res.json({
        msg : "something is wrong with our server"
    })
})

app.listen(port, ()=>{
    console.log(`system is connected on port ${port}`);
})
