import React from 'react'
import { useChat } from '../hooks/useChat'
import {useForm} from 'react-hook-form'

const PromptBox = () => {
  const {handleSubmit,register,reset} = useForm()


  const {sendMessages, sending} = useChat()


  const handlePromptSubmit = async (data) => {
    const message = data.message?.trim()

    if(!message){
      return
    }

    await sendMessages(message)
    reset({ message: '' })
  };

  return (
    <form  onSubmit={handleSubmit(handlePromptSubmit)}  className='prompt-box'>
        <input {...register("message")} type="text" placeholder='Ask anything' autoComplete='off' />
        <button type='submit' disabled={sending}>
          <i className="ri-send-ins-line"></i>
        </button>
    </form>
  )
}

export default PromptBox