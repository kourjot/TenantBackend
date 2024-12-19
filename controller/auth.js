import jwt from "jsonwebtoken";
import argon2  from "argon2"
import "dotenv/config";
import { User } from "../model/user.js";
const SECRET_KEY=process.env.SECRET_KEY

const getuser=async (req,res)=>{
  try{
    const { page = 1, limit = 10, sortBy = 'createdAt' } = req.query;
    const alluser=await User.find().skip((page-1)*limit).limit(Number(limit)).sort({[sortBy]:-1})
    
    res.status(200).json(alluser)
  }catch(err){
    res.status(500).json({ error: err.message })
  }
}


const register = async (req, res) => {
  const { username, email, password,role } = req.body;
  const hashpass=await argon2.hash(password)

  try {
    const user = await new User({ 
      username, 
      email, 
      password:hashpass, 
      role 
    });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email:email});
  if (!user) return res.status(404).json({ message: "User not found" });
  try {
    const vaild=await argon2.verify(user.password,password);
   
    if(vaild){
      const token=jwt.sign({
        id: user._id,
        username: user.username 
      },SECRET_KEY,{
        expiresIn: "10m"
      })
      const refreshToken=jwt.sign({
        id: user._id,
        for:"refresh/token"
      },SECRET_KEY,{
        expiresIn: "28days"
      })
    
    return res.json({
      token:token,
      refreshToken:refreshToken,
      msg:"Token expired in 10 minutes"
    })
   }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { register, login ,getuser};
