import React from 'react'
import { useChat } from '../hooks/useChat'

const ChatItem = ({chat}) => {
  
  const {selectChat} = useChat()

  return (
        <button onClick={() => selectChat(chat)} className='chat-item'>
           <span className="chat-title">{chat.title}</span>
        </button>
  )
}

export default ChatItem