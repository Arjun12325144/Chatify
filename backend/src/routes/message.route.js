import express from 'express';
import {getAllContacts, getMessagesByUserId, sendMessage,getChatPartners} from '../controllers/message.controller.js'; 
import { protectRoute } from '../middleware/auth.middleware.js'
import { arcjetProtection } from '../middleware/arcjet.middleware.js'
const router = express.Router();


router.use(arcjetProtection, protectRoute)

router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners); // provide name that chats are going ebtwen
router.get("/:id",getMessagesByUserId); // basically provide chats between two person so we want to provide id
router.post("/send/:id", sendMessage) //the user we want to send the message

export default router;