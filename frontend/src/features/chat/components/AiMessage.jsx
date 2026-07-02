import React from 'react'

const AiMessage = ({message}) => {
    console.log(message);
  return (
    <div className='ai-message'>
        <div className="ai-bubble">
            {message.content}
        </div>
    </div>
  )
}

export default AiMessage