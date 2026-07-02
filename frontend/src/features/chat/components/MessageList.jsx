import React from 'react'
import { useChat } from '../hooks/useChat'

const MessageList = () => {
  

  const {currentChat,messagesByChat,loadingMessages} = useChat()

  const messages = messagesByChat?.[currentChat._id] || []


  if(loadingMessages){
    return (
       <h4>Loading...</h4>
    )
  }

  return (
    <div className='message-list'>
      {messages.length}
    </div>
  )
}

export default MessageList