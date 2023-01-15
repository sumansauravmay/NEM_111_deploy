const mongoose=require("mongoose")
mongoose.set('strictQuery', false)
require("dotenv").config();
// mongodb://127.0.0.1:27017/nemmasai
const connection=mongoose.connect(process.env.mongoURL)

module.exports={connection}






