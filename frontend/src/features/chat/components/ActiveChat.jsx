import React from 'react'
import MessageList from './MessageList'
import PromptBox from './PromptBox'
import ChatHeader from './ChatHeader'

const ActiveChat = () => {
  return (
    <section className='active-chat'>
        <MessageList />
        <PromptBox />
    </section>
  )
}

export default ActiveChat