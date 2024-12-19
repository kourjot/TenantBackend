import {connect} from "mongoose"
import "dotenv/config";
const url=process.env.MONGO_URL
const db =async()=>{
    try{
        await connect(url)
        console.log('Connected to MongoDB!')
    }catch(e){
        console.error('Failed to connect to MongoDB:', e.message)
    }
}
export default db