import React from 'react'
import { useChat } from '../hooks/useChat'
import { NavLink } from 'react-router'

const ChatItem = ({chat, onClose}) => {
  
  const {selectChat} = useChat()



  return (
        <NavLink
          onClick={() => {
            selectChat(chat)
            onClose?.()
          }}
          className='chat-item'
          to={`/c/${chat._id}`}
        >
           <span className="chat-title">{chat.title}</span>
        </NavLink>
  )
}

export default ChatItem


