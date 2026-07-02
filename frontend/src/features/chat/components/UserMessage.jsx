import React from 'react'

const UserMessage = ({message}) => {
  return (
    <div className='user-message'>
        <div className="user-bubble">
            {message.content}
        </div>
    </div>
  )
}

export default UserMessage