import React from 'react'
import { useAuth } from '../features/auth/hooks/useAuth'
import { Navigate, Outlet, useNavigate } from 'react-router'

const ProtectedRoute = () => {
    const {user,loading} = useAuth()


    if(loading){
        return <h1>Loading...</h1>
    }

    return user ?  <Outlet /> : <Navigate to={'/login'} />
 
}

export default ProtectedRoute