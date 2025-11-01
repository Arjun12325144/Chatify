import mongoose from 'mongoose';

export const connectDB = async()=>{
    try{
       const conn =  await mongoose.connect(process.env.MONGO_URI)
       console.log("Mongodb connected",conn.connection.host);
    }catch(err){
        console.error("Error connecting to Mongodb",err);
        process.exit(1);
    }
}