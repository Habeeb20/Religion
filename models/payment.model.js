import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    email:String,
    amount:Number,
    reference: String,
    status: String
})

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment