import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    nameOfReporter:{
        type:String,
        required: true
    },
    date:{
        type:Date,
        default: Date.now
    },
    emailOfReporter:{
        type:String,
        required:true
    },
    phonenum: {
        type:String,
        required:true
    },
    nameOfMinister:{
        type:String,
        required: true
    },
    church:{
        type:String,
        required: true
    },
    emailOfReported:{
        type:String,
        required: true
    },
    offense:{
        type:String,
        required: true
    }
}, {timestamps: true})

export default mongoose.model("Report", reportSchema)