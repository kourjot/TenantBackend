import {property} from "../model/property.js"
import { User } from "../model/user.js"; 
const createProperty=async(req,res)=>{
    try{
        const {email,address,rent}=req.body
        if(!email){
            return res.status(400).json({ msg:"Email is required" });
        }
        if (!address) {
            return res.status(400).json({ msg: "Address is required" });
          }
          if (!rent) {
            return res.status(400).json({ msg: "Rent is required" });
          }
        const finduser=await User.findOne({email})
        if (!finduser) {
            return res.status(404).json({ msg: 'User not found' });
        }
        const landlordId=finduser._id;
        const exitproperty=await property.findOne({landlordId})
        if(exitproperty){
            exitproperty.address = address;
            exitproperty.rent = rent;

            await exitproperty.save();
            return res.status(200).json({
                message: "Property updated successfully",
                property: exitproperty,
            });
        }else{
            const newproperty=new property({
                landlordId,
               address,
               rent
           })
           await newproperty.save()
           res.status(201).json({ message: 'Property created successfully', property });
        }
        
    }catch(err){
        res.status(400).json({ msg:"Error creating property",error: err.message });
    }
}

const getproperty=async(req,res)=>{
    try{
        const properties=await property.find()
        
        
        if(!properties) return res.status(404).json({msg: 'Property not found' });
        res.json(properties);
    }catch (err) {
        res.status(500).json({ message: 'Error fetching properties', error: err.message });
}
}
export {createProperty,getproperty}