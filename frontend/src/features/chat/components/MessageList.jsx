import React from 'react'
import { useChat } from '../hooks/useChat'
import Message from './Message';

const MessageList = () => {
  

  const {currentChat,messagesByChat,loadingMessages} = useChat()

  if(!currentChat) return null;

  const chatData = messagesByChat?.[currentChat._id] || []
  const messages = chatData?.messages || []

  
  if(loadingMessages){
    return (
       <h4>Loading...</h4>
    )
  }

  return (
    <div className='message-list'>
        {
          messages.map(message => (
            <Message key={message._id} message={message} />
          ))
        }
    </div>
  )
}

export default MessageList