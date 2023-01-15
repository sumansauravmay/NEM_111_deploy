const mongoose=require("mongoose")

const noteSchema=mongoose.Schema({
    title:String,
    note:String,
    category:String,
    userID:String
})


const Notemodel=mongoose.model("note",noteSchema)

module.exports={Notemodel};

