import React from 'react'
import MessageList from './MessageList'
import PromptBox from './PromptBox'

const ActiveChat = () => {
  return (
    <section className='active-chat'>
        <MessageList  />
        <PromptBox />
    </section>
  )
}

export default ActiveChat