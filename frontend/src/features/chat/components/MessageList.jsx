import React, { useEffect, useMemo, useRef } from 'react'
import { useChat } from '../hooks/useChat'
import Message from './Message';

const MessageList = () => {
  

  const {currentChat,messagesByChat,loadingMessages,sending,streaming} = useChat()
  const messageListRef = useRef(null)

  const chatData = useMemo(() => {
    if(!currentChat){
      return []
    }

    return messagesByChat?.[currentChat._id] || []
  },[currentChat, messagesByChat])

  useEffect(() => {
    if(messageListRef.current){
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight
    }
  },[chatData, sending])

  if(!currentChat) return null;

  
  if(loadingMessages){
    return (
       <h4>Loading...</h4>
    )
  }

  

  return (
    <div ref={messageListRef} className='message-list'>
        {
          chatData.map(message => (
            <Message key={message._id} message={message} />
          ))
        }
        {
          sending && !streaming && (
            <div className='ai-message'>
              <div className='ai-bubble'>Thinking...</div>
            </div>
          )
        }
    </div>
  )
}

export default MessageList