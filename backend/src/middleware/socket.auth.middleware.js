import jwt from 'jsonwebtoken'
import User from "../models/User.js"
import {ENV} from '../lib/env.js'
export const socketAuthMiddleware = async(socket,next)=>{
    try{
        //extract token from http-only cookies
        const token = socket.handshake.headers.cookie
        ?.split("; ")
        .find((row)=>row.startsWith("jwt="))
        ?.split("=")[1];

        if(!token){
            console.log("socket connection rejected")
            return next(new Error("Unauthorized - No Token Provided"))
        }
        // verify the token 
        const decoded  = jwt.verify(token,ENV.JWT_SECRET);
        if(!decoded){
            console.log("Socket connection rejected")
            return next(new Error("Unauthorized"));
        }
        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            console.log("Socket connection rejected")
            return next(new Error("User not found"));
        }

        // attact user info to socket
        socket.user = user;
        socket.userId = user._id.toString();
        console.log(`socket authenticated for users: ${user.fullName} (${user._id})`);
        next();
    }catch(err){
        console.log("Socket connection rejected")
        return next(new Error(" Authentication failed"));
    }
}