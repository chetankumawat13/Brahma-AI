import React from 'react'
import { useChat } from '../hooks/useChat'

const NewChatButton = ({ onClose }) => {
  const { startNewChat } = useChat()

  const handleNewChat = () => {
    startNewChat()
    onClose?.()
  }

  return (
    <button onClick={handleNewChat} className='new-chat'>
        <i className="ri-add-line"></i>
        New chat 
    </button>
  )
}

export default NewChatButton