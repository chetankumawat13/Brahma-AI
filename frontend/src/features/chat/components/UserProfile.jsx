import React from 'react'
import { useAuth } from '../../auth/hooks/useAuth'

const UserProfile = () => {
  const { user } = useAuth()
  const userData = user?.user || user
  const username = userData?.username || 'User'

  return (
    <div className='user-profile'>
        <div className='avatar'>
            {username.charAt(0)}
        </div>
        <h4>{username}</h4>
    </div>
  )
}

export default UserProfile