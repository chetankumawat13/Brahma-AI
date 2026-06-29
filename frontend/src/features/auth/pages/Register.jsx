import React, { useState } from 'react'
import TopBar from '../components/TopBar'
import { Link } from 'react-router'

const Register = () => {

    const [step, setStep] = useState(1)

  return (
    <div className='form-container'>
        <TopBar />
        <div className="form-title">
            <h4>Create Account</h4>
        </div>
        <form action="">
            {
                step === 1 && (
                    <>  
                        <div className="input-box">
                            <input type="email" id='email' placeholder='' />
                            <label htmlFor="email">Email address</label>
                        </div>
                        <div className="input-box">
                            <input type="password" id='password' placeholder='' />
                            <label htmlFor="password">password</label>
                        </div>
                        <button>Continue</button>
                        <p>Already have an account <Link to={'/login'} >Login</Link></p>
                    </>
                )
            }
        </form>
    </div>
  )
}

export default Register