import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";
import userModel from "../models/user.model.js";
import { generateChatTittle, generateResponse, streamResponse } from "../services/ai.service.js";

function streamEvent(res, event, payload){
    res.write(`event: ${event}\n`)
    res.write(`data: ${JSON.stringify(payload)}\n\n`)
}


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
        aiMessage,
        message
    })

}

export async function sendMessageStream(req,res){
    const {message,chatId} = req.body

    let title = null, chat = null

    res.setHeader("Content-Type", "text/event-stream")
    res.setHeader("Cache-Control", "no-cache")
    res.setHeader("Connection", "keep-alive")

    try{
        if(!chatId){
            title = await generateChatTittle(message)
            chat = await chatModel.create({
                user:req.user.id,
                title
            })

            streamEvent(res, "meta", {
                chat,
                title
            })
        }

        await messageModel.create({
            chat:chatId || chat._id,
            content:message,
            role:"user"
        })

        const messages = await messageModel.find({chat:chatId || chat._id})

        const fullResponse = await streamResponse(messages, (token) => {
            streamEvent(res, "token", { token })
        })

        const aiMessage = await messageModel.create({
            chat:chatId || chat._id,
            content:fullResponse,
            role:"ai"
        })

        streamEvent(res, "done", {
            chat,
            title,
            aiMessage,
            message
        })
        res.end()
    }catch(err){
        streamEvent(res, "error", {
            message: err.message || "Streaming failed"
        })
        res.end()
    }
}

export async function getMe(req,res){
    const user = req.user

    const chats = await chatModel.find({user:user.id})
    
    res.status(200).json({
        message:"chat retrieved successfully",
        chats
    })

}

export async function getMessage(req,res){
    const {chatId} = req.params

    const chat = await chatModel.findOne({
        _id:chatId,
        user:req.user.id
    })

    if(!chat){
        return res.status(404).json({
            message:"Chat not Found"
        })
    }


    const messages = await messageModel.find({
        chat:chatId
    })

    res.status(200).json({
        message:"messages fetched successfully",
        messages 
    })


}

 