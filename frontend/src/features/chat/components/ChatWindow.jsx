import React, { useState } from 'react'
import ChatHeader from './ChatHeader'
import EmptyChat from './EmptyChat'
import ActiveChat from './ActiveChat';
import { useChat } from '../hooks/useChat';

const ChatWindow = () => {


  const {currentChat} = useChat()


  return (
    <main className='chat-window'>
        <ChatHeader />
       {
        currentChat ? <ActiveChat /> : <EmptyChat />
       }
    </main>
  )
}

export default ChatWindow