import React, { useEffect, useState } from 'react'
import { useChat } from '../hooks/useChat'
import SideBar from '../components/SideBar'
import ChatWindow from '../components/ChatWindow'
import '../style/chat.css'
import { useParams } from 'react-router'

const Dashboard = () => {

    const { id } = useParams()
    const { initializeSocketConnection, loadChats, chats, selectChat, setCurrentChat } = useChat()
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
      const syncViewportState = () => {
        const mobile = window.innerWidth <= 768
        setIsMobile(mobile)
        setSidebarOpen(!mobile)
      }

      syncViewportState()
      window.addEventListener('resize', syncViewportState)

      return () => window.removeEventListener('resize', syncViewportState)
    }, [])
     
    useEffect(() => {
      initializeSocketConnection()
      loadChats()
    }, [initializeSocketConnection, loadChats])

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

    const closeSidebar = () => {
      if(isMobile){
        setSidebarOpen(false)
      }
    }

  return (
    <div className='chat-layout'>
        {isMobile && sidebarOpen && (
          <div
            className='sidebar-overlay sidebar-overlay-active'
            onClick={() => setSidebarOpen(false)}
            aria-hidden='true'
          />
        )}
        <SideBar isOpen={sidebarOpen} onClose={closeSidebar} />
        <ChatWindow onOpenSidebar={() => setSidebarOpen(true)} />
    </div>
  )
}

export default Dashboard