import React, { useEffect } from 'react'
import { useChat } from '../hooks/useChat'
import SideBar from '../components/SideBar'
import ChatWindow from '../components/ChatWindow'

const Dashboard = () => {

    const chat = useChat()
     
    useEffect(() => {
         chat.initializeSocketConnection()
    },[ ])

  return (
    <div className='chat-layout'>
        <SideBar />
        <ChatWindow />
    </div>
  )
}

export default Dashboard