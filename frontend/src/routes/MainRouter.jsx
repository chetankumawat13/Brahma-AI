import {createBrowserRouter} from 'react-router'
import AuthLayout from '../layout/AuthLayout'
import Login from '../features/auth/pages/Login'
import Register from '../features/auth/pages/Register'
import Dashboard from '../features/chat/pages/Dashboard'



export const MainRouter = createBrowserRouter([
    {
        element:<AuthLayout />,
        children:[
            {
                path:"/login",
                element:<Login />
            },
            {
                path:"/register",
                element:<Register />
            }
        ]
    },
    {
        path:'/',
        element:<Dashboard />
    }
])