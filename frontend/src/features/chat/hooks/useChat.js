import { useContext, useEffect } from "react";
import { initializeSocketConnection } from "../service/chat.socket";
import { ChatContext } from "../chat.context";
import { getChats, getMessages, sendMessage } from "../service/chat.api";



export const useChat = () => {

    const context = useContext(ChatContext)
    const {loadingChats,setLoadingChats,chats,setChats,currentChat,setCurrentChat,messagesByChat,loadingMessages,setLoadingMessages,setMessagesByChat,sending,setSending} = context


    const loadChats = async () => {
        try{
            setLoadingChats(true)
            const chats = await getChats();
            setChats(chats)
        }catch(err){
            console.log(err);
        }finally{
            setLoadingChats(false)
        }
    }

    const selectChat = async (chat) => {
        setCurrentChat(chat)

        if(messagesByChat[chat._id]){
            return
        }

        try{
            setLoadingMessages(true)
           const messages = await getMessages(chat._id)

           setMessagesByChat(prev =>({
             ...prev,
             [chat._id]:messages
           }) )

        }
        finally{
            setLoadingMessages(false)
        }
    }

    const loadMessages = async () => {

    }

    const  sendMessages = async (content) => {
        setSending(true)
        const optimisticMessage = {

            _id: crypto.randomUUID(),
        
            role: "user",
        
            content,
        
            createdAt: new Date()
        
        }

        setMessagesByChat(prev => ({

            ...prev,
        
            [currentChat._id]: {
        
                ...prev[currentChat._id],
        
                messages: [
        
                    ...prev[currentChat._id].messages,
        
                    optimisticMessage
        
                ]
        
            }
        
        }))

        const response = await sendMessage({

            message: content,
        
            chatId: currentChat?._id
        
        });

        setChats(prev=>[

            response.chat,
            
            ...prev
            
        ])

        setCurrentChat(response.chat)

        setMessagesByChat(prev=>({

            ...prev,
            
            [chatId]:{
            
            ...prev[chatId],
            
            messages:[
            
            ...prev[chatId].messages,
            
            response.aiMessage
            
            ]
            
            }
            
            }))

        setSending(false)
    }

    const deleteChat = async () => {

    }

    const renameChat = async () => {

    }

    const clearChat = async () => {

    }

    const stopStreaming = async () => {

    }


    return {
        initializeSocketConnection,loadChats,chats,loadingChats,selectChat,currentChat,messagesByChat,loadingMessages
    }
}