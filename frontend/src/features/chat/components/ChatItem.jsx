import React from 'react'

const ChatItem = ({chat}) => {
  return (
        <button className='chat-item'>
            {chat.title}
        </button>
  )
}

export default ChatItem