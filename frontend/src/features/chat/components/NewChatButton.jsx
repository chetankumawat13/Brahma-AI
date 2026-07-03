import React from 'react'
import { useChat } from '../hooks/useChat'

const NewChatButton = () => {
  const { startNewChat } = useChat()

  return (
    <button onClick={startNewChat} className='new-chat'>
        <i className="ri-add-line"></i>
        New chat 
    </button>
  )
}

export default NewChatButton