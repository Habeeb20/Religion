import mongoose from "mongoose";


const chatSchema = new mongoose.Schema({
    sender: String,
    message:String,
    fileUrl:String,
    createdAt:{type:Date, default: Date.now}
})

export default mongoose.model("Chat", chatSchema)