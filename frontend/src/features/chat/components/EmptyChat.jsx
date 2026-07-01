import React from 'react'
import PromptBox from './PromptBox'

const EmptyChat = () => {
  return (
    <section className='empty-chat'>
        <h1>What's on your mind today?</h1>
        <PromptBox />
    </section>
  )
}

export default EmptyChat