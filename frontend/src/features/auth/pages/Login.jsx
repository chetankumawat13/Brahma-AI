import React, { useState } from 'react'
import '../style/form.css'
import TopBar from '../components/TopBar'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import {useForm} from 'react-hook-form'

const Login = () => {

    const {user,loading,handleLogin} = useAuth()
    const {handleSubmit,register} = useForm()
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLoginSubmit = async (data) => {
            try{
                setError('')
                await handleLogin(data.email,data.password)
                navigate('/')
            }
            catch(err){
                const message = err.response?.data.message
                setError(message)
            }
    }
 
  return (
    <div className='form-container'>
        <TopBar />
        <div className="form-title">
            <h4>
                Login
            </h4>
        </div>
        <form onSubmit={handleSubmit(handleLoginSubmit)} action="">
            <small>{error && `${error}`}</small>
            <div className="input-box">
                <input {...register('email')} type="email" id='email' placeholder='' />
                <label htmlFor="email">Email address</label>
            </div>
            <div className="input-box">
                <input {...register('password')} type="password" id='password' placeholder='' />
                <label htmlFor="password">Password</label>
            </div>
            <button  >{loading ? (<><span className='spinner'>Logging in...</span></>) : ('Login')}</button>
            <p>Don't have an account ? <Link to={'/register'}>Create new account</Link></p>
            
        </form>

    </div>
  )
}

export default Login