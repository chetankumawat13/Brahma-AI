import { useContext, useEffect } from "react";
import { initializeSocketConnection } from "../service/chat.socket";
import { ChatContext } from "../chat.context";
import { getChats, getMessages } from "../service/chat.api";



export const useChat = () => {

    const context = useContext(ChatContext)
    const {loadingChats,setLoadingChats,chats,setChats,currentChat,setCurrentChat,messageByChat,setLoadingMessages,setMessageByChat} = context


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

    useEffect(() => {
        loadChats()
},[])

    const selectChat = async (chat) => {
        setCurrentChat(chat)

        if(messageByChat[chat._id]){
            return
        }

        try{
            setLoadingMessages(true)
           const messages = await getMessages(chat._id)

           setMessageByChat(prev =>({
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

    const  sendMessages = async () => {

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
        initializeSocketConnection,loadChats,chats,loadingChats,selectChat,currentChat
    }
}