import {createBrowserRouter} from 'react-router'
import AuthLayout from '../layout/AuthLayout'
import Login from '../features/auth/pages/Login'



export const MainRouter = createBrowserRouter([
    {
        element:<AuthLayout />,
        children:[
            {
                path:"/login",
                element:<Login />
            }
        ]
    }
])