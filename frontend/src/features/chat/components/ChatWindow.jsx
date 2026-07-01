import React from 'react'
import ChatHeader from './ChatHeader'
import EmptyChat from './EmptyChat'

const ChatWindow = () => {
  return (
    <main className='chat-window'>
        <ChatHeader />
        <EmptyChat />
    </main>
  )
}

export default ChatWindow