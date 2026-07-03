import React from 'react'
import { useChat } from '../hooks/useChat'

const ChatHeader = ({ onOpenSidebar }) => {
  const { currentChat } = useChat()

  return (
    <header className='chat-header'>
        <button type='button' className='chat-menu-button' onClick={onOpenSidebar} aria-label='Open sidebar'>
          <i className='ri-menu-line'></i>
        </button>
        <h2>{'Brahma-AI'}</h2>
    </header>
  )
}

export default ChatHeader