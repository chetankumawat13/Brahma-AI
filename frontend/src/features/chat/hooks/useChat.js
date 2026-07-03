import { useCallback, useContext } from "react";
import { initializeSocketConnection } from "../service/chat.socket";
import { ChatContext } from "../chat.context";
import { getChats, getMessages, sendMessageStream } from "../service/chat.api";
import { useNavigate } from "react-router";



export const useChat = () => {

    const context = useContext(ChatContext)
    const {
        loadingChats,
        setLoadingChats,
        chats,
        setChats,
        currentChat,
        setCurrentChat,
        messagesByChat,
        loadingMessages,
        setLoadingMessages,
        setMessagesByChat,
        sending,
        setSending,
        streaming,
        setStreaming
    } = context
    const navigate = useNavigate()


    const loadChats = useCallback(async () => {
        try{
            setLoadingChats(true)
            const fetchedChats = await getChats();
            setChats(fetchedChats)
            return fetchedChats
        }catch(err){
            console.log(err);
            return []
        }finally{
            setLoadingChats(false)
        }
    },[setChats, setLoadingChats])

    const loadChatMessages = useCallback(async (chatId) => {
        if(messagesByChat[chatId]){
            return messagesByChat[chatId]
        }

        try{
            setLoadingMessages(true)
           const messages = await getMessages(chatId)

           setMessagesByChat(prev =>({
             ...prev,
             [chatId]:messages
           }) )

           return messages

        }catch(err){
            console.log(err);
            return []
        }
        finally{
            setLoadingMessages(false)
        }
    },[messagesByChat, setLoadingMessages, setMessagesByChat])

    const selectChat = useCallback(async (chat, options = {}) => {
        const { navigateTo = true } = options

        if(!chat?._id){
            return
        }

        setCurrentChat(chat)

        if(navigateTo){
            navigate(`/c/${chat._id}`)
        }

        await loadChatMessages(chat._id)
    },[loadChatMessages, navigate, setCurrentChat])

    const startNewChat = useCallback(() => {
        setCurrentChat(null)
        navigate('/')
    },[navigate, setCurrentChat])

    const sendMessages = useCallback(async (text, chatId) => {
        const message = text?.trim();

        if(!message || sending || streaming){
            return
        }

        const resolvedChatId = chatId || currentChat?._id || null
        const optimisticUserId = `local-user-${Date.now()}`
        const optimisticAiId = `local-ai-${Date.now()}`
        let activeChatId = resolvedChatId

        if(resolvedChatId){
            setMessagesByChat(prev => ({
                ...prev,
                [resolvedChatId]:[
                    ...(prev[resolvedChatId] || []),
                    {
                        _id: optimisticUserId,
                        chat: resolvedChatId,
                        content: message,
                        role: 'user'
                    },
                    {
                        _id: optimisticAiId,
                        chat: resolvedChatId,
                        content: '',
                        role: 'ai'
                    }
                ]
            }))
        }

        try{
            setSending(true)
            setStreaming(true)

            await sendMessageStream({
                message,
                chatId: resolvedChatId,
                onMeta: (data) => {
                    if(!data?.chat){
                        return
                    }

                    activeChatId = data.chat._id
                    setChats(prev => [data.chat, ...prev.filter(chat => chat._id !== data.chat._id)])
                    setCurrentChat(data.chat)
                    navigate(`/c/${data.chat._id}`)

                    setMessagesByChat(prev => ({
                        ...prev,
                        [activeChatId]: [
                            {
                                _id: optimisticUserId,
                                chat: activeChatId,
                                content: message,
                                role: 'user'
                            },
                            {
                                _id: optimisticAiId,
                                chat: activeChatId,
                                content: '',
                                role: 'ai'
                            }
                        ]
                    }))
                },
                onToken: ({ token }) => {
                    if(!activeChatId || !token){
                        return
                    }

                    setMessagesByChat(prev => ({
                        ...prev,
                        [activeChatId]: (prev[activeChatId] || []).map(msg => {
                            if(msg._id !== optimisticAiId){
                                return msg
                            }

                            return {
                                ...msg,
                                content: `${msg.content}${token}`
                            }
                        })
                    }))
                },
                onDone: (data) => {
                    if(!activeChatId || !data?.aiMessage){
                        return
                    }

                    setMessagesByChat(prev => ({
                        ...prev,
                        [activeChatId]: (prev[activeChatId] || []).map(msg => {
                            if(msg._id !== optimisticAiId){
                                return msg
                            }

                            return {
                                ...data.aiMessage,
                                content: data.aiMessage.content || msg.content
                            }
                        })
                    }))

                    if(data.chat){
                        setChats(prev => [data.chat, ...prev.filter(chat => chat._id !== data.chat._id)])
                    }else if(currentChat){
                        setChats(prev => [currentChat, ...prev.filter(chat => chat._id !== currentChat._id)])
                    }
                },
                onError: (data) => {
                    throw new Error(data?.message || 'Streaming failed')
                }
            })
        }catch(err){
            console.log(err);

            if(activeChatId){
                setMessagesByChat(prev => ({
                    ...prev,
                    [activeChatId]: (prev[activeChatId] || []).filter(
                        msg => msg._id !== optimisticUserId && msg._id !== optimisticAiId
                    )
                }))
            }
        }finally{
            setSending(false)
            setStreaming(false)
        }
    },[
        currentChat,
        navigate,
        sending,
        setChats,
        setCurrentChat,
        setMessagesByChat,
        setSending,
        setStreaming,
        streaming
    ])

    return {
        initializeSocketConnection,
        loadChats,
        chats,
        loadingChats,
        selectChat,
        currentChat,
        setCurrentChat,
        messagesByChat,
        loadingMessages,
        sending,
        streaming,
        sendMessages,
        startNewChat
    }
}