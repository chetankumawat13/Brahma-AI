import React from 'react'
import { useAuth } from '../features/auth/hooks/useAuth'
import { useNavigate } from 'react-router'

const ProtectedRoute = ({children}) => {
    const {user,loading} = useAuth()
    const navigate = useNavigate()

    if(!user){
         return navigate('/login')
    }

    return children
 
}

export default ProtectedRoute