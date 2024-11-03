import mongoose from "mongoose";

const tranasctionSchema = mongoose.Schema({
  clerkId:{type: String, required:true},
  plan:{ type:String, required:true},
  amount:{type:Number, required:true},
  credits:{ type: Number, required:true},
  payment:{ type: Boolean, default: false},
  date:{ type: Number },
})


export const TRANSACTION = mongoose.models.TRANSACTION || mongoose.model('transaction', tranasctionSchema)
