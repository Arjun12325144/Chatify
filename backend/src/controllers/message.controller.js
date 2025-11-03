import cloudinary from '../lib/cloudinary.js'
import Message from '../models/Message.js'
import User from '../models/User.js'

export const getAllContacts = async(req,res)=>{
    try{
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne:loggedInUserId }}).select("-password") // fetch all users except the logged in user
        res.status(200).json(filteredUsers)
    }catch(err){
        console.log("Error in gettingallcontacts: ",err);
        res.status(500).json({message:"Server error"})
    }
}

export const getMessagesByUserId=async(req,res)=>{
    try{
        const myId = req.user._id;
        const {id: userToChatId} = req.params;
        const messages = await Message.find({
            $or:[
                { senderId: myId, receiverId: userToChatId },
                { senderId:userToChatId, receiverId: myId },

            ]
        });
        res.status(200).json(messages);
    }catch(err){
        console.log("Error in getMessages controller",err);
        res.status(500).json({message:"Server Error"})
    }
}

export const sendMessage = async(req,res)=>{
    
    try{
        
        const { text,image} = req.body;
        const { id: receiverId } = req.params;
        const senderId= req.user._id;
        if(!text && !image){
            return res.status(400).json({message:"Message text or image is required"})
        }
        if(senderId.equals(receiverId)){
            return res.status(400).json({message:"You cannot send message to yourself"})
        }

        const receiverExists = await User.exists({_id: receiverId})
        if(!receiverExists){
            return res.status(404).json({message:"Receiver not found"})
        }
        let imageUrl;
        if(image){
            //upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        })

        await newMessage.save();

        // todo: send message in real time if user is online -> socket.io
        res.status(200).json(newMessage);
 

    }catch(err){
        console.log("Error in sendMessage controller: ",err);
        res.status(500).json({message:"Server Error"})
    }
}
export const getChatPartners = async(req,res)=>{
    try{
        const loggedInUserId = req.user._id;
        // find all messages where loggedinuser is either sedner or receiver
        const messages = await Message.find({
            $or:[{ senderId: loggedInUserId }, { receiverId: loggedInUserId }]
        })

        const chatPartnersIds = [ ...new Set(messages.map((msg)=>
            msg.senderId.toString() === loggedInUserId.toString() ? msg.receiverId.toString() : msg.senderId.toString()
        ))]

        const chatPartners = await User.find({_id: {$in:chatPartnersIds }}).select("-password")
        res.status(200).json(chatPartners)
    }catch(err){
        console.log("Error in getChatPartner: ",err);
        res.status(500).json({message:"Server Error"})
    }
}