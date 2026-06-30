import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";
import userModel from "../models/user.model.js";
import { generateChatTittle, generateResponse } from "../services/ai.service.js";


export async function sendMessage(req,res){
    const {message,chatId} = req.body
    
    let title = null,chat = null;

    if(!chatId){
        title = await generateChatTittle(message)
        chat = await chatModel.create({
            user:req.user.id,
            title
        })
    }

    const userMessage = await messageModel.create({
        chat:chatId || chat._id,
        content:message,
        role:"user"
    })

    const messages = await messageModel.find({chat:chatId || chat._id})

    const result = await generateResponse(messages);

    const aiMessage = await messageModel.create(
        {
            chat:chatId || chat._id,
            content:result,
            role:"ai"
        }
    )

    res.status(201).json({
        title,
        chat,
        aiMessage
    })

}