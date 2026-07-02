import React, { useState } from 'react'
import ChatHeader from './ChatHeader'
import EmptyChat from './EmptyChat'
import ActiveChat from './ActiveChat';
import { useChat } from '../hooks/useChat';

const ChatWindow = () => {


  const {currentChat,messagesByChat} = useChat()

  console.log(messagesByChat);

  const messages = messagesByChat[currentChat?._id] || []

  console.log(messages);

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