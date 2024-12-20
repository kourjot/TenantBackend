import {Schema ,model} from "mongoose"
const proertySchema=new Schema({
    landlordId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    address:{
        type:String,
        required:true
    },
    rent:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["available","rented"],
        default:"available"
    }
})
const property=model("proerty",proertySchema)
export {property}