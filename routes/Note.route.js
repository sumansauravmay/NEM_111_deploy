const express=require("express")
const {Notemodel}=require("../models/Note.model")
const noteRouter=express.Router();

noteRouter.get("/",async(req,res)=>{
    try{
     let data=await Notemodel.find()
     res.send(data)
    }
    catch(err){
        console.log(err)
    }
res.send("All the notes")
})

noteRouter.post("/create",async(req,res)=>{
    const payload=req.body;
    try{
const new_note=new Notemodel(payload)
await new_note.save();
res.send("Created the note")
    }
    catch(err){
        console.log(err)
    }
    })

    noteRouter.patch("/update/:id",async(req,res)=>{
       const payload=req.body;
       const id=req.params.id;

       const note=await Notemodel.findOne({"_id":id})
       console.log(note)
       const userID_in_note=note.userID;
        const userID_making_req=req.body.userID;
        
       try{
        if(userID_making_req!==userID_in_note){
            res.send({"msg":"You are not authorized"})
        }
        else{
            await Notemodel.findByIdAndUpdate({_id:id},payload)
            res.send("updated the notes")
        }
       }
       catch(err){
        console.log(err)
       }
    
        })

        noteRouter.delete("/delete/:id",async(req,res)=>{
       const id=req.params.id;

       const note=await Notemodel.findOne({"_id":id})
       console.log(note)
       const userID_in_note=note.userID;
        const userID_making_req=req.body.userID;
        
       try{
        if(userID_making_req!==userID_in_note){
            res.send({"msg":"You are not authorized"})
        }
        else{
            await Notemodel.findByIdAndDelete({_id:id})
            res.send("Deleted the notes")
        }
       }
            catch(err){
                console.log(err);
            }
             res.send("Deleted the notes")
             })


             
module.exports={
    noteRouter
};


