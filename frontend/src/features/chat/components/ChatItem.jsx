import React from 'react'

const ChatItem = ({chat}) => {
  return (
        <button className='chat-item'>
           <span className="chat-title">{chat.title}</span>
        </button>
  )
}

export default ChatItem