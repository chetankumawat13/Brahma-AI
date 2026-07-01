import React, { useState } from 'react'
import ChatHeader from './ChatHeader'
import EmptyChat from './EmptyChat'
import ActiveChat from './ActiveChat';

const ChatWindow = () => {

  const [currentChat, setCurrentChat] = useState(null);

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