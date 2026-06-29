import React from 'react'
import '../style/form.css'
import TopBar from '../components/TopBar'
import { Link } from 'react-router'

const Login = () => {
  return (
    <div className='form-container'>
        <TopBar />
        <div className="form-title">
            <h4>
                Login
            </h4>
        </div>
        <form action="">
            <div className="input-box">
                <input type="email" id='email' placeholder='' />
                <label htmlFor="email">Email address</label>
            </div>
            <div className="input-box">
                <input type="password" id='password' placeholder='' />
                <label htmlFor="password">Password</label>
            </div>
            <button>Login</button>
            <p>Don't have an account ? <Link to={'/register'}>Create new account</Link></p>
            
        </form>

    </div>
  )
}

export default Login