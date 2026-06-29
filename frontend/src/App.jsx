import React from 'react'
import './features/shared/global.css'
import './features/shared/theme.css'
import { RouterProvider } from 'react-router'
import { MainRouter } from './routes/MainRouter'
import { AuthProvider } from './features/auth/auth.context'

const App = () => {
  return (
      <AuthProvider>
           <RouterProvider router={MainRouter} />
      </AuthProvider>
  )
}

export default App