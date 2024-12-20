import {OTP} from "../model/otp.js"
import nodemailer from "nodemailer"
import crypto from "node:crypto"
import argon2  from "argon2"
import "dotenv/config"

import { User} from "../model/user.js"
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
        user:process.env.laondlordEmail,
        pass:process.env.PASS
    }
})
const forgetPassword =async(req,res)=>{
    const {email}=req.body
    const otp=crypto.randomInt(100000,1000000)
    await transporter.sendMail({
        to:email,
        from:"admin@gmail.com",
        subject:"Reset Password OTP", 
        html:`<h>Reset Password </h>${otp}`
    })
    await OTP.insertMany([
        {
            email,
            otp,
        }
    ])
    res.json({
        otp,
        msg:"OTP sent to your email successfully"
    })
}

const resetPassword = async (req, res) => {
    const { email, otp, newpassword } = req.body;
    
    try {
     
        const user = await OTP.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        console.log(user);
        if (String(user.otp).trim() === String(otp).trim()) {
            console.log('OTP matched:', otp);
            if (!newpassword) {
                return res.status(400).json({ msg: 'New password is required' });
            }
            const hash = await argon2.hash(newpassword);

            user.password = hash;
            await user.save();

            return res.json({ newpassword,msg: "Password reset successfully" });
        }


        return res.json({ msg: "Incorrect OTP" });

    } catch (e) {
    
        console.error(e);
        res.status(500).json({ msg: 'Server Error' });
    }
};

export {forgetPassword,resetPassword}