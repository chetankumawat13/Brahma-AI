import React from 'react'
import { Outlet } from 'react-router'
import '../features/shared/layout.css'

const AuthLayout = () => {
  return (
    <div className='auth-layout'>
        <h1>Brahma-AI</h1>
        <div className="auth-component">
            <Outlet />
        </div>
    </div>
  )
}

export default AuthLayout