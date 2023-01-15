const express=require('express')
const {connection}=require("./config/db")
const {noteRouter} = require('./routes/Note.route')
const {userRouter}=require("./routes/User.route")
const {authenticate}=require("./middlewares/authenticate.middleware")
const cors=require("cors");
require("dotenv").config();
const app=express()

app.use(cors({
    origin:"*"
}))
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Welcome to home page")
})

app.use("/user",userRouter)
app.use(authenticate)
app.use("/notes",noteRouter)



app.listen(process.env.port,async()=>{
    try{
await connection;
console.log(`port is running on ${process.env.port}`)
    }
    catch(err){
        console.log("error while connectiog to mongo")
        console.log(err)
    }
    
})
