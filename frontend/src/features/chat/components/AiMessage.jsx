import React from 'react'
import MarkdownRenderer from "./MarkdownRenderer";

const AiMessage = ({message}) => {
    console.log(message);
  return (
    <div className='ai-message'>
        <div className="ai-bubble">
            <MarkdownRenderer>
                 {message.content}
            </MarkdownRenderer>
        </div>
    </div>
  )
}

export default AiMessage