import React from 'react'
import UserMessage from './UserMessage'
import AiMessage from './AiMessage'

const Message = ({message}) => {

    console.log(message);

if(message.role==="user"){
    return <UserMessage message={message} />
}
  return <AiMessage message={message} />
}

export default Message