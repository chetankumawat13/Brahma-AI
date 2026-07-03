import React from 'react'
import ChatHeader from './ChatHeader'
import EmptyChat from './EmptyChat'
import ActiveChat from './ActiveChat';
import { useChat } from '../hooks/useChat';

const ChatWindow = ({ onOpenSidebar }) => {


  const {currentChat} = useChat()


  return (
    <main className='chat-window'>
        <ChatHeader onOpenSidebar={onOpenSidebar} />
       {
        currentChat ? <ActiveChat /> : <EmptyChat />
       }
    </main>
  )
}

export default ChatWindow