import {Schema ,model} from "mongoose"
const OtpSchema=new Schema({
    email:String,
    otp:String
})

const OTP=model("Otp",OtpSchema)
export {OTP}