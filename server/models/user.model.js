import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId:{
    type:String,
    unique:true,
    required:true
  },
  email:{
    type:String,
    unique:true,
    required:true
  },
  photo:{
    type:String,
    required:true
  },
  firstName:{
    type:String,
  },
  lastName:{
    type:String,
  },
  creditBalance:{
    type:Number,
    default:5
  }
},{ timestamps:true })


export const USER = mongoose.models.USER || mongoose.model('USER', userSchema)