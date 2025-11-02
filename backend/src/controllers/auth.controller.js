import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { generateToken } from '../lib/utils.js' 
import User from '../models/User.js'
import bcrypt from "bcryptjs"
import {ENV} from '../lib/env.js'
export const signup = async(req,res)=>{
    const {fullName,email,password} = req.body;

    try{
        if(!fullName || !email || !password){
            return res.status(400).json({message: "All fields are required"})
        }
        if(password.length <6){
            return res.status(400).json({message:"Password must be at least 6 characters"})
        }

        // check if email valid:regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message:"Invalid email format"})
        }

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:"Email already exists"});

        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = new User({
            fullName,
            email,
            password:hashedPassword
        })
        if(newUser){
            const savedUser = await newUser.save();
            generateToken(savedUser._id,res);

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic,
            })

            // todo:send a welcome email to user
            try{
                await sendWelcomeEmail(savedUser.email,savedUser.fullName,ENV.CLIENT_URL)
            }catch(err){
                console.log("failed to send welcome email",err);
            }

        }else{
            res.status(400).json({message:"Invalid user data"})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message:"something went wrong"})
    }
}