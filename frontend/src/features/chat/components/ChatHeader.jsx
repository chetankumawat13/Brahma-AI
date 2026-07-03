import React from 'react'
import { useChat } from '../hooks/useChat'

const ChatHeader = () => {
  const { currentChat } = useChat()

  return (
    <header className='chat-header'>
        <h2>{'Brahma-AI'}</h2>
    </header>
  )
}

export default ChatHeader