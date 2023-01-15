const express=require("express")
const {UserModel}=require("../models/User.model")
const userRouter=express.Router()
const jwt=require("jsonwebtoken")
const bcrypt = require('bcrypt')



userRouter.post("/register",async (req,res)=>{
    const {email,pass,name,age}=req.body;
    try{
        bcrypt.hash(pass, 5,async(err, secure_password)=>{
            // Store hash in your password DB.
    if(err){
        console.log(err)
    }
    else{
        const user=new UserModel({email,pass:secure_password,name,age});
        await user.save();
        res.send("Registered");
    }
        });
    }
    catch(err){
        res.send("err while doing registration")
    res.send(err)
    }
    })
    
    userRouter.post("/login",async(req,res)=>{
        const {email,pass}=req.body;
        try{
            const user=await UserModel.find({email});
            const hashed_pass=user[0].pass; 
            if(user.length>0)
            {
          bcrypt.compare(pass, hashed_pass, function(err, result) {
               // result == true
    if(result){
        const token = jwt.sign({userID:user[0]._id}, 'masai');
        res.send({"msg":"Login successful","token":token});
    }
    else{
        res.send("wrong credential");
    }
                });
            }
            else{
                res.send("Wrong credential!!")
            }
            
        }
        catch(err){
            res.send(err)
        } 
    })
    
    userRouter.get("/about",(req,res)=>{
        res.send("About Page")
    })
    
    userRouter.get("/data",(req,res)=>{
        const token=req.headers.authorization;
        console.log(token)
    
        jwt.verify(token, 'masai', function(err, decoded) {
       if(err)
       {
        res.send("Invalid token")
       }else{
        res.send("Data...")
       }
          });
    
    })
    
    userRouter.get("/contact",(req,res)=>{
        res.send("contact")
    })
    
    userRouter.get("/cart",(req,res)=>{
        const token=req.query.token;
    
        jwt.verify(token, 'masai', function(err, decoded) {
       if(err)
       {
        res.send("Invalid token")
        console.log(err)
       }else{
        res.send("Cart...")
       }
          });
    })
    
module.exports={userRouter}
