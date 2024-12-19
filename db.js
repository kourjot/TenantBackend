import {connect} from "mongoose"
import "dotenv/config";
const db =async()=>{
    try{
        await connect(process.env.MONGO_URL)
        console.log('Connected to MongoDB!')
    }catch(e){
        console.error('Failed to connect to MongoDB:', e.message)
    }
}
export default db