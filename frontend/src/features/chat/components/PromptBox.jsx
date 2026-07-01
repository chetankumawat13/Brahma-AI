import React from 'react'

const PromptBox = () => {
  return (
    <form className='prompt-box'>
        <input type="text" placeholder='Ask anything' />
        <button><i className="ri-send-ins-line"></i></button>
    </form>
  )
}

export default PromptBox