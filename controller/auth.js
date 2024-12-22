import argon2  from "argon2"
import "dotenv/config";
import { User} from "../model/user.js";
// import { Tenant } from '../model/tenant.js';
// import {landlord} from "../model/landlord.js";
const SECRET_KEY=process.env.SECRET_KEY
const getuser=async(req,res)=>{
  try{
    const { page = 1, limit = 10, sortBy = 'createdAt' } = req.query;
    const alluser=await User.find().skip((page-1)*limit).limit(Number(limit)).sort({[sortBy]:-1})
    res.status(200).json(alluser)
  }catch(err){
    res.status(500).json({ error: err.message })
  }
}


const register = async (req, res) => {
  let { username, email, password,role } = req.body;
  // password=password.toString();
  const hashpass=await argon2.hash(password);
  // console.log(typeof hashpass)
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


const login = async (req,res) => {
  try {
    const { email, password,role} = req.body;
    const user = await User.findOne({ email:email,role:role });
    const vaild=await argon2.verify(user.password,password); 
    console.log(vaild);
    if (!vaild){
          return res.status(400).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    res.status(400).json({ message: 'Error logging in', error: err.message });
    console.log(err)
  }
};

export { register, login ,getuser};
