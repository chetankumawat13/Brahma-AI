import React from 'react'
import './features/shared/global.css'
import './features/shared/theme.css'
import { RouterProvider } from 'react-router'
import { MainRouter } from './routes/MainRouter'
import { AuthProvider } from './features/auth/auth.context'
import { ChatProvider } from './features/chat/chat.context'

const App = () => {
  return (
      <AuthProvider>
        <ChatProvider>
           <RouterProvider router={MainRouter} />
        </ChatProvider>
      </AuthProvider>
  )
}

export default App