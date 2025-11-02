import mongoose from 'mongoose';
import {ENV} from './env.js'
export const connectDB = async()=>{
    try{
       const conn =  await mongoose.connect(ENV.MONGO_URI)
       console.log("Mongodb connected",conn.connection.host);
    }catch(err){
        console.error("Error connecting to Mongodb",err);
        process.exit(1);
    }
}