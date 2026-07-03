import React, { useEffect } from 'react'
import { useChat } from '../hooks/useChat'
import SideBar from '../components/SideBar'
import ChatWindow from '../components/ChatWindow'
import '../style/chat.css'
import { useParams } from 'react-router'

const Dashboard = () => {

    const { id } = useParams()
    const { initializeSocketConnection, loadChats, chats, selectChat, setCurrentChat } = useChat()
     
        useEffect(() => {
          initializeSocketConnection()
          loadChats()
            },[initializeSocketConnection, loadChats])

    useEffect(() => {
        if(!id){
          setCurrentChat(null)
          return
        }

        const matchedChat = chats.find(chat => chat._id === id)

        if(matchedChat){
          selectChat(matchedChat, { navigateTo: false })
        }
    },[id, chats, selectChat, setCurrentChat])

  return (
    <div className='chat-layout'>
        <SideBar />
        <ChatWindow />
    </div>
  )
}

export default Dashboard