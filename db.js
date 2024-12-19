import {connect} from "mongoose"
import "dotenv/config";
const db =async()=>{
    try{
        await connect("mongodb+srv://pkour6188:RhFrZzxOKU47YyoK@tenantdbs.ivn6n.mongodb.net/?retryWrites=true&w=majority&appName=tenantdbs")
        console.log('Connected to MongoDB!')
    }catch(e){
        console.error('Failed to connect to MongoDB:', e.message)
    }
}
export default db