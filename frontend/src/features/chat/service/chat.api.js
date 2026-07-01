import axios from 'axios'

const api = axios.create({
    baseURL:"http://localhost:3000/api",
    withCredentials:true
})


export async function getChats(){
    const response = api.get("chats")
    return response.data.chats
}

export async function getMessages(chatId){
    const response = api.get(`/chats/${chatId}/messages`);
    return response.data.messages
}


export async function sendMessage(message,chatId){
    const response = await api.post('/chats/message',{
        message,
        chatId
    })

    return response.data
}