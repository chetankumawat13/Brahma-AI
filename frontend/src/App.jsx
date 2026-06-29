import React from 'react'
import './features/shared/global.css'
import './features/shared/theme.css'
import { RouterProvider } from 'react-router'
import { MainRouter } from './routes/MainRouter'

const App = () => {
  return (
      <RouterProvider router={MainRouter} />
  )
}

export default App